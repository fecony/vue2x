<script setup lang="ts">
import { ref } from 'vue';

const { tab, active, disabled } = defineProps<{
  tab: { label: string; value: string };
  active: boolean;
  disabled: boolean;
}>();

const defaultClass = ref('inline-block rounded-md px-4 py-2 text-sm focus:relative');
const activeClass = ref('bg-white text-blue-500 hover:text-blue-700');
const staleClass = ref('text-gray-500 hover:text-gray-700');
const disabledClass = ref('text-gray-400 pointer-events-none');
</script>

<template>
  <button
    :disabled="!!disabled"
    :data-cy="tab.value"
    :class="[defaultClass, disabled ? disabledClass : active ? activeClass : staleClass]"
    @click="$emit('tabSelected', tab.value)"
  >
    {{ tab.label }}
  </button>
</template>
