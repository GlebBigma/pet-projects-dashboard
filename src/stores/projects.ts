import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api';
import type { Project } from '../types/project.ts';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      projects.value = response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const addProject = async (project: Project) => {
    try {
      const response = await api.post('/projects', project);
      projects.value.push(response.data);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProject = async (id: number, updatedData: Partial<Project>) => {
    try {
      await api.patch(`/projects/${id}`, updatedData);
      const index = projects.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        projects.value[index] = { ...projects.value[index], ...updatedData };
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };


  const deleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);
      projects.value = projects.value.filter((p) => p.id !== id);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return { projects, fetchProjects, addProject, updateProject, deleteProject };
});
