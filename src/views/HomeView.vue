<script setup lang="ts">
import TaskList from '@/components/Task/TaskList.vue';
import EmptyList from '@/components/Task/EmptyList.vue';
import TabsGroup from '@/components/Tabs/TabsGroup.vue';
import BaseLinkButton from '@/components/Buttons/BaseLinkButton.vue';
import Whiteboard from '@/components/Whiteboard.vue';
import { useStore } from '@/store';
import { onMounted, ref, watch } from 'vue';
import type { Task } from '@/types';

const selectedTab = ref('');
const filteredTasks = ref<Task[]>([]);

const tabs = ref([
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]);

const handleTabSelection = (value: string) => {
  selectedTab.value = value;
};

const store = useStore();

watch(selectedTab, (tab) => {
  if (['', 'all'].includes(tab)) {
    filteredTasks.value = store.state.task.tasks;
  } else {
    filteredTasks.value = store.getters[`task/${tab}`];
  }
});

onMounted(() => {
  filteredTasks.value = store.state.task.tasks;
});
</script>

<template>
  <section class="flex flex-col h-full space-y-2 max-h-[70vh]">
    <div class="flex justify-between">
      <TabsGroup
        :disabled="!filteredTasks.length"
        :tabs="tabs"
        :selectedTab="selectedTab"
        @tabSelected="handleTabSelection"
      />

      <BaseLinkButton
        :to="{ name: 'create-task' }"
        label="Create task"
        icon="plus"
      />
    </div>

    <Whiteboard>
      <TaskList
        v-if="!!filteredTasks.length"
        :tasks="filteredTasks"
      />
      <EmptyList v-else />
    </Whiteboard>
  </section>
</template>
