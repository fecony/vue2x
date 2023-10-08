<script setup lang="ts">
const {
  type = 'button',
  label,
  icon,
  ghost = false,
} = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  icon?: string;
  ghost?: boolean;
}>();
</script>

<template>
  <button
    :data-cy="type"
    :type="type"
    @click="$emit('click')"
    class="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 align-middle transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600"
    :class="[ghost ? 'hover:bg-gray-100' : 'shadow-sm bg-white hover:bg-gray-50 border']"
  >
    <span
      :data-cy="label"
      v-if="label"
      >{{ label }}</span
    >
    <feather
      v-if="icon"
      class="w-5 h-5"
      :data-cy="icon"
      :type="icon"
    />
  </button>
</template>
