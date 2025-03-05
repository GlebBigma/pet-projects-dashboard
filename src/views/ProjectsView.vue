<script setup lang="ts">
import { ref } from 'vue';
import { Toolbar, Button } from 'primevue';
import NewProjectModal from '../components/Projects/NewProjectModal.vue';
import ProjectsTable from '../components/Projects/ProjectsTable.vue';

const projectFormModal = ref();

const openModal = () => {
  projectFormModal.value.openModal();
};
</script>

<template>
  <Toolbar>
    <template #start>
      <h1>Projects</h1>
    </template>
    <template #end>
      <Button label="New Project" @click="openModal" />
      <NewProjectModal ref="projectFormModal" />
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
