import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api';
import type { Task } from '../types/task';
// import type { Project } from '../types/project';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const fetchTasksByProjectId = async (projectId: number) => {
    try {
      const response = await api.get('/projects');
      const project = response.data.find((p: { id: string }) => p.id === projectId.toString());
      if (project) {
        tasks.value = project.tasks;
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // For Future development, need fixes
  // const addTask = async (task: Task, projectId: number) => {
  //   console.log('ProjectID > ', projectId);
  //   console.log('Task ', task);
  //   try {
  //     const response = await api.get('/projects');
  //     console.log('Response > ', response.data);
  //     const project = response.data.find((p: Project) => p.id === projectId);
  //
  //     console.log('>>> PROJECT', project);
  //
  //     if (project) {
  //       project.tasks.push(task);
  //
  //       await api.put(`/projects/${projectId}`, project);
  //
  //       const projectIndex = response.data.findIndex((p: Project) => p.id === projectId);
  //       if (projectIndex !== -1) {
  //         response.data[projectIndex].tasks = project.tasks;
  //       }
  //     } else {
  //       console.error('Project not found');
  //     }
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //   }
  // };

  return {
    tasks,
    fetchTasksByProjectId,
    // addTask,
  };
});
