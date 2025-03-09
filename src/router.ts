import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import ProjectsView from './views/ProjectsView.vue';
import TasksView from './views/TasksView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/projects/:projectsId', name: 'tasks', component: TasksView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
