<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useConfirm, Button, DataTable, ConfirmDialog, Column, Tag } from 'primevue';
import { useProjectsStore } from '../../stores/projects.ts';
import EditProjectModal from './EditProjectModal.vue';

const store = useProjectsStore();
const confirm = useConfirm();
const editProjectFormModal = ref<InstanceType<typeof EditProjectModal> | null>(null);

onMounted(() => {
  store.fetchProjects();
});

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'todo':
      return 'success';
    case 'inProgress':
      return 'warning';
    case 'done':
      return 'info';
    default:
      return 'contrast';
  }
};

const openModal = (id: number) => {
  // Викликає метод openModal на компоненті EditProjectModal
  if (editProjectFormModal.value) {
    editProjectFormModal.value.openModal(id);
  }
};

const deleteProject = (id: number) => {
  confirm.require({
    message: 'Ви впевнені, що хочете видалити цей проєкт?',
    header: 'Підтвердження видалення',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Так',
    rejectLabel: 'Скасувати',
    accept: () => store.deleteProject(id),
  });
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
      <Column field="taskCount" header="Number of tasks" :sortable="true" />
      <Column field="status" header="Status" :sortable="true">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
        </template>
      </Column>
      <Column field="createdAt" header="Creation date" :sortable="true" />
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

<style scoped>
.card {
  padding: 20px;
  background-color: #1e1e1e;
  color: #ffffff;
}
</style>
