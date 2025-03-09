<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import PageTitle from '../components/UIComponents/PageTitle.vue';
import NewProjectModal from '../components/Projects/NewProjectModal.vue';
import ProjectsTable from '../components/Projects/ProjectsTable.vue';

const projectFormModal = ref();

const openModal = () => {
  projectFormModal.value.openModal();
};
</script>

<template>
  <PageTitle title="Projects">
    <template #end>
      <Button label="New Project" @click="openModal" />
      <NewProjectModal ref="projectFormModal" />
    </template>
  </PageTitle>
  <ProjectsTable />
</template>
