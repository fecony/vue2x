/* eslint-disable prettier/prettier */
import type { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import type { State } from './state';
import type { Task } from '@/types';

export type Mutations<S = State> = {
  [MutationTypes.CREATE_TASK](state: S, payload: Task): void;
  [MutationTypes.UPDATE_TASK](state: S, payload: Task): void;
  [MutationTypes.DELETE_TASK](state: S, id: string): void;
  [MutationTypes.TOGGLE_TASK_COMPLETED_STATE](state: S, id: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.CREATE_TASK](state, payload) {
    state.tasks.push(payload);
  },
  [MutationTypes.UPDATE_TASK](state, payload) {
    const index = state.tasks.findIndex((task) => task.id === payload.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, payload);
    }
  },
  [MutationTypes.DELETE_TASK](state, id) {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  },
  [MutationTypes.TOGGLE_TASK_COMPLETED_STATE](state, id) {
    const task = state.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  },
};
