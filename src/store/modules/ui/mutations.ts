import type { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import type { State } from './state';
import type { ConfirmationModal } from '@/types';

export type Mutations<S = State> = {
  [MutationTypes.SET_CONFIRM_DIALOG](state: S, payload: ConfirmationModal): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CONFIRM_DIALOG](state, payload) {
    state.confirmationDialog = payload;
  },
};
