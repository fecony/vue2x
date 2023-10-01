import type { ActionTree, ActionContext } from 'vuex';
import type { State } from './state';
import type { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import type { ConfirmationModal } from '@/types/ui';
import type { RootState } from '@/store/store';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  [ActionTypes.OPEN_CONFIRM_DIALOG](
    { commit }: AugmentedActionContext,
    payload: Omit<ConfirmationModal, 'visible'>,
  ): void;
  [ActionTypes.CLOSE_CONFIRM_DIALOG]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  [ActionTypes.OPEN_CONFIRM_DIALOG]({ commit }, payload) {
    commit(MutationTypes.SET_CONFIRM_DIALOG, { ...payload, visible: true });
  },
  [ActionTypes.CLOSE_CONFIRM_DIALOG]({ commit }) {
    commit(MutationTypes.SET_CONFIRM_DIALOG, {
      title: '',
      message: '',
      visible: false,
      confirm: undefined,
    });
  },
};
