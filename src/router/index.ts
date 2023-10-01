import Vue from 'vue';
import Router from 'vue-router';
import NotFoundView from '@/views/NotFoundView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Tasks' },
    },
    { path: '/tasks', redirect: { name: 'home' } },
    {
      path: '/tasks/create',
      name: 'create-task',
      component: () => import('@/views/CreateTaskView.vue'),
      meta: { title: 'Create Task' },
    },
    {
      path: '/tasks/:id',
      name: 'view-task',
      component: () => import('@/views/ViewTaskView.vue'),
      meta: { title: 'Task' },
    },
    {
      path: '/tasks/:id/update',
      name: 'update-task',
      component: () => import('@/views/UpdateTaskView.vue'),
      meta: { title: 'Update Task' },
    },
    {
      path: '*',
      name: '404',
      component: NotFoundView,
      meta: { layout: 'none' },
    },
  ],
});

export default router;
