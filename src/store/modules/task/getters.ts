import type { RootState } from '@/store/store';
import type { Task } from '@/types';
import type { GetterTree } from 'vuex';
import type { State } from './state';

export type Getters = {
  getByTaskId(state: State): (id: string) => Task | undefined;
  pending(state: State): Task[];
  completed(state: State): Task[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  getByTaskId: (state) => (id: string) => {
    return state.tasks.find((task) => task.id === id);
  },
  pending: (state) => state.tasks.filter((task) => !task.completed),
  completed: (state) => state.tasks.filter((task) => task.completed),
};
