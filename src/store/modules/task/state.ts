import type { Task } from '@/types';

export const state: { tasks: Task[] } = {
  tasks: [
    { id: '1', name: 'Task 1', completed: true },
    { id: '2', name: 'Task 2', completed: false },
    { id: '3', name: 'Task 3', completed: false },
    { id: '4', name: 'Task 4', completed: false, dueDate: '2023-10-06T17:39' },
    { id: '5', name: 'Task 5', completed: true, dueDate: '2023-10-06T17:39' },
  ],
};

export type State = typeof state;
