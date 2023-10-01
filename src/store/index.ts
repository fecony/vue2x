import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { TaskModule } from './modules/task';
import { UiModule } from './modules/ui';
import type { RootState } from './store';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'vue2x',
});

const store = new Vuex.Store<RootState>({
  modules: {
    task: TaskModule,
    ui: UiModule,
  },
  plugins: [...(import.meta.env?.PROD ? [vuexLocal.plugin] : [])],
});

export const useStore = () => store;

export default store;
