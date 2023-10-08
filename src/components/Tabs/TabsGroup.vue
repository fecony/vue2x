<script setup lang="ts">
import TabItem from './TabItem.vue';

const { tabs, selectedTab, disabled } = defineProps<{
  disabled: boolean;
  tabs: Array<{
    label: string;
    value: string;
  }>;
  selectedTab?: string;
}>();
</script>

<template>
  <div
    data-cy="tabs-group"
    class="inline-flex p-1 bg-gray-100 border border-gray-100 rounded-lg w-fit"
  >
    <TabItem
      :disabled="disabled"
      v-for="(tab, index) in tabs"
      :key="index"
      :tab="tab"
      :active="selectedTab ? selectedTab === tab.value : index === 0"
      @tabSelected="$emit('tabSelected', tab.value)"
    />
  </div>
</template>
