<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../../types/project.ts';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const projects = ref<Project[]>([
  { id: 1, name: 'Project Alpha', taskCount: 5, status: 'Active', createdAt: '2023-01-01' },
  { id: 2, name: 'Project Beta', taskCount: 3, status: 'Inactive', createdAt: '2023-02-15' },
  { id: 3, name: 'Project Gamma', taskCount: 7, status: 'Active', createdAt: '2023-03-10' },
  { id: 4, name: 'Project Delta', taskCount: 2, status: 'Completed', createdAt: '2023-04-20' },
]);

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'warning';
    case 'Completed':
      return 'info';
    default:
      return 'contrast';
  }
};
</script>

<template>
  <div class="card">
    <DataTable
        :value="projects"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        tableStyle="min-width: 50rem"
    >
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="taskCount" header="Number of tasks" :sortable="true"></Column>
      <Column field="status" header="Status" :sortable="true">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
        </template>
      </Column>
      <Column field="createdAt" header="Creation date" :sortable="true"></Column>
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
