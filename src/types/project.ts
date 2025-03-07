import type { Task } from './task.ts';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  createdAt: string;
  tasks: Task[];
}
