import type { Module } from 'vuex';
import { state, type State } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import type { RootState } from '@/store/store';

export const UiModule: Module<State, RootState> = {
  namespaced: true,
  state: () => state,
  actions,
  mutations,
};
