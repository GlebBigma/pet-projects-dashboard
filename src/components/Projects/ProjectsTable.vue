<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Project } from '../../types/project.ts';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

const projects = ref<Project[]>([]);

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
</script>

<template>
  <div class="card">
    <DataTable
        :value="projects"
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
