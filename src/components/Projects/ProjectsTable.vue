<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import dayjs from 'dayjs';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import ConfirmDialog from 'primevue/confirmdialog';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

import { useProjectsStore } from '../../stores/projects';
import EditProjectModal from './EditProjectModal.vue';

const store = useProjectsStore();
const confirm = useConfirm();
const toast = useToast();
const editProjectFormModal = ref<InstanceType<typeof EditProjectModal> | null>(null);

const searchName = ref('');
const selectedStatus = ref<string | null>(null);

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
  editProjectFormModal.value?.openModal(id);
};

const deleteProject = async (id: number): Promise<void> => {
  confirm.require({
    message: 'Are you sure you want to delete this project?',
    header: 'Confirm deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    accept: async () => {
      await store.deleteProject(id);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Project deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'Cancelled', detail: 'Delete canceled', life: 3000 });
    }
  });
};

const formatDate = (date: string): string => dayjs(date).format('DD-MM-YYYY');

const filteredProjects = computed(() =>
    store.projects.filter((project) => {
      const matchesName = project.name.toLowerCase().includes(searchName.value.toLowerCase());
      const matchesStatus = selectedStatus.value ? project.status === selectedStatus.value : true;
      return matchesName && matchesStatus;
    })
);

const statusOptions = ref([
  { label: 'All', value: null },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'inProgress' },
  { label: 'Done', value: 'done' }
]);
</script>

<template>
  <div class="card">
    <ConfirmDialog />

    <div class="filters">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchName" placeholder="Search by name" />
      </span>

      <Dropdown
          v-model="selectedStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Filter by status"
      />
    </div>

    <DataTable
        :value="filteredProjects"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        tableStyle="min-width: 50rem"
        resizableColumns
        columnResizeMode="expand"
        :customSort="true"
    >
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="tasks" header="Number of tasks">
        <template #body="{ data }">
          {{ data.tasks.length }}
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
        </template>
      </Column>
      <Column field="createdAt" header="Creation date" sortable>
        <template #body="{ data }">
          {{ formatDate(data.createdAt) }}
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

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.p-inputtext {
  height: 42px;
}
</style>
