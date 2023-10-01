<template>
  <transition>
    <keep-alive>
      <component
        :is="layout"
        :title="title"
      >
        <router-view />
        <ConfirmationModal />
      </component>
    </keep-alive>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router/composables';

const route = useRoute();

const layout = computed(() => `${route.meta?.layout || 'default'}-layout`);
const title = computed(() => route.meta?.title || '');
</script>
