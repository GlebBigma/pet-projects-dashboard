import { createRouter, createWebHistory } from 'vue-router';

import ProjectsView from './views/ProjectsView.vue';

const routes = [
  {path: '/', name: 'projects', component: ProjectsView},
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
