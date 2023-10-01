import type { ActionTree, ActionContext } from 'vuex';
import type { State } from './state';
import type { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import type { Task } from '@/types';
import { nanoid } from 'nanoid';
import type { RootState } from '@/store/store';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.CREATE_TASK](context: AugmentedActionContext, payload: Task): void;
  [ActionTypes.UPDATE_TASK](context: AugmentedActionContext, payload: Task): void;
  [ActionTypes.DELETE_TASK](context: AugmentedActionContext, id: string): void;
  [ActionTypes.DUPLICATE_TASK](context: AugmentedActionContext, id: string): void;
  [ActionTypes.TOGGLE_TASK_COMPLETED_STATE](
    context: AugmentedActionContext,
    id: string,
  ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.CREATE_TASK]({ commit }, payload) {
    commit(MutationTypes.CREATE_TASK, payload);
  },
  [ActionTypes.UPDATE_TASK]: ({ commit }, payload) => {
    commit(MutationTypes.UPDATE_TASK, payload);
  },
  [ActionTypes.DELETE_TASK]: ({ commit }, id) => {
    commit(MutationTypes.DELETE_TASK, id);
  },
  [ActionTypes.DUPLICATE_TASK]: ({ commit, state }, id) => {
    const taskToDuplicate = state.tasks.find((task) => task.id === id);
    if (!taskToDuplicate) {
      console.error(`Task ${id} does not exist.`);
      return;
    }
    const duplicatedTask = {
      ...taskToDuplicate,
      name: `${taskToDuplicate.name} (duplicate)`,
      id: nanoid(),
    };
    commit(MutationTypes.CREATE_TASK, duplicatedTask);

    return duplicatedTask.id;
  },
  [ActionTypes.TOGGLE_TASK_COMPLETED_STATE]: ({ commit }, id) => {
    commit(MutationTypes.TOGGLE_TASK_COMPLETED_STATE, id);
  },
};
