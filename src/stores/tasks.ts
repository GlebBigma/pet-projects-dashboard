import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api';
import type { Task } from '../types/task.ts';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const fetchTasksByProjectId = async (projectId: number) => {
    console.log('projectID > ', projectId);
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

  // const addTask = async (task: Task) => {
  //   try {
  //     const response = await api.post('/tasks', task);
  //     tasks.value.push(response.data);
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //   }
  // };
  //
  // const updateTask = async (id: number, updatedData: Partial<Task>) => {
  //   try {
  //     await api.patch(`/tasks/${id}`, updatedData);
  //     const index = tasks.value.findIndex((t) => t.id === id);
  //     if (index !== -1) {
  //       tasks.value[index] = { ...tasks.value[index], ...updatedData };
  //     }
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //   }
  // };
  //
  // const deleteTask = async (id: number) => {
  //   try {
  //     await api.delete(`/tasks/${id}`);
  //     tasks.value = tasks.value.filter((t) => t.id !== id);
  //   } catch (error) {
  //     console.error('Error deleting task:', error);
  //   }
  // };

  return {
    tasks,
    fetchTasksByProjectId,
    // addTask,
    // updateTask,
    // deleteTask
  };
});
