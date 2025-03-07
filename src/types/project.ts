export interface Project {
  id: number;
  name: string;
  taskCount: number;
  status: 'todo' | 'inProgress' | 'done';
  createdAt: string;
}
