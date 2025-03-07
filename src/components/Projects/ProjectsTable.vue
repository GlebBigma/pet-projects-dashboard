<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useConfirm, useToast, Button, DataTable, ConfirmDialog, Column, Tag } from 'primevue';
import { useProjectsStore } from '../../stores/projects';
import EditProjectModal from './EditProjectModal.vue';
import dayjs from 'dayjs'; // Імпортуємо dayjs

const store = useProjectsStore();
const confirm = useConfirm();
const toast = useToast();
const editProjectFormModal = ref<typeof EditProjectModal | null>(null);

onMounted(() => {
  store.fetchProjects();
});

const getStatusSeverity = (status: string): string => {
  switch (status) {
    case 'todo': return 'success';
    case 'inProgress': return 'warning';
    case 'done': return 'info';
    default: return 'contrast';
  }
};

const openModal = (id: number): void => {
  if (editProjectFormModal.value) {
    editProjectFormModal.value.openModal(id);
  }
};

const deleteProject = (id: number): void => {
  confirm.require({
    message: 'Are you sure you want to delete this project?',
    header: 'Confirm deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    accept: () => {
      store.deleteProject(id);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Project deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'Cancelled', detail: 'Delete canceled', life: 3000 });
    }
  });
};

// Функція для форматування дати
const formatDate = (date: string): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss'); // Формат, наприклад, 2025-03-07 21:19:47
};
</script>

<template>
  <div class="card">
    <ConfirmDialog />
    <DataTable
        :value="store.projects"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        tableStyle="min-width: 50rem"
        resizableColumns
        columnResizeMode="expand"
    >
      <Column field="id" header="ID" :sortable="true" />
      <Column field="name" header="Name" :sortable="true" />
      <Column field="taskCount" header="Number of tasks" :sortable="true">
        <template #body="{ data }">
          {{ data.tasks.length }}
        </template>
      </Column>
      <Column field="status" header="Status" :sortable="true">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
        </template>
      </Column>
      <Column field="createdAt" header="Creation date" :sortable="true">
        <template #body="{ data }">
          {{ formatDate(data.createdAt) }} <!-- Викликаємо форматування -->
        </template>
      </Column>
      <Column header="Actions">
        <template #body="{ data }">
          <Button
              label="Edit"
              class="p-button-rounded p-button-text p-button-warning"
              @click="openModal(data.id)"
          />
          <EditProjectModal ref="editProjectFormModal" />
          <Button
              label="Remove"
              class="p-button-rounded p-button-text p-button-danger"
              @click="deleteProject(data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
