<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useProjectsStore } from '../stores/projects';
import Chart from 'primevue/chart';
import type { Project } from '../types/project'

const projectsStore = useProjectsStore()

const chartData = ref({
  labels: ['Todo', 'In Progress', 'Done'],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
})


const updateChartData = () => {
  const todoCount = projectsStore.projects.filter(
      (project: Project) => project.status === 'todo'
  ).length
  const inProgressCount = projectsStore.projects.filter(
      (project: Project) => project.status === 'inProgress'
  ).length
  const doneCount = projectsStore.projects.filter(
      (project: Project) => project.status === 'done'
  ).length

  chartData.value.datasets[0].data = [todoCount, inProgressCount, doneCount]
}

onMounted(async () => {
  await projectsStore.fetchProjects()
  updateChartData()
})
</script>

<template>
  <div class="chart-container">
    <Chart :type="'pie'" :data="chartData" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 600px;
  height: 600px;
  margin: 0 auto;
}
</style>
