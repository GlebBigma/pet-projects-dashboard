import { createRouter, createWebHistory } from 'vue-router';

import ProjectsView from './views/ProjectsView.vue';
import TasksView from './views/TasksView.vue';

const routes = [
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/projects/:projectsId', name: 'tasks', component: TasksView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
