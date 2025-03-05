<script setup lang="ts">
import { Toolbar} from 'primevue';
import ProjectsTable from '../components/Projects/ProjectsTable.vue';
</script>

<template>
  <Toolbar>
    <template #start>
      <h1>Projects</h1>
    </template>
  </Toolbar>
  <ProjectsTable />
</template>

<style scoped>
.p-toolbar {
  padding: 20px;
  margin-bottom: 20px;

  background-color: #1e1e1e;
  border: none;
  border-radius: 0;
  color: #ffffff;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
}
</style>
