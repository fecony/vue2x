<script setup lang="ts">
import type { RouterLink } from 'vue-router';
import type { Location } from 'vue-router/types/router';

const { label, icon, to } = defineProps<{
  to: Location;
  label: string;
  icon?: string;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    data-cy="base-link-button"
    class="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600"
  >
    <span>{{ label }}</span>
    <feather
      v-if="icon"
      class="w-5 h-5"
      :type="icon"
    />
  </RouterLink>
</template>
