import Vue from 'vue';
import VueFeather from 'vue-feather';
import('preline');

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/tailwind.css';

Vue.use(VueFeather);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
