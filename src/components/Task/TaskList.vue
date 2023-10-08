<script setup lang="ts">
import TaskItem from '@/components/Task/TaskItem.vue';
import type { Task } from '@/types/task';

const { tasks } = defineProps<{ tasks: Task[] }>();
</script>

<template>
  <div
    class="grid gap-4 p-4 overflow-visible overflow-y-scroll snap-y sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
  >
    <TaskItem
      v-for="task in tasks"
      :task="task"
      :key="task.id"
    />
  </div>
</template>
