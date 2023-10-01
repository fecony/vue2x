import type { Module } from 'vuex';
import { state, type State } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import type { RootState } from '@/store/store';

export const TaskModule: Module<State, RootState> = {
  namespaced: true,
  state: () => state,
  getters,
  actions,
  mutations,
};
