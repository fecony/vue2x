import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required, alpha_dash, alpha_spaces } from 'vee-validate/dist/rules';
import VueFeather from 'vue-feather';

import App from './App.vue';
import router from './router';
import store from './store';

import Default from '@/layouts/Default.vue';
import None from '@/layouts/None.vue';

import Logo from '@/components/Logo.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

import 'inter-ui/inter.css';
import './assets/tailwind.css';

Vue.component('Logo', Logo);
Vue.component('ConfirmationModal', ConfirmationModal);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('default-layout', Default);
Vue.component('none-layout', None);
Vue.component('feather', VueFeather);

extend('required', required);
extend('alpha-dash', alpha_dash);
extend('alpha-spaces', alpha_spaces);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
