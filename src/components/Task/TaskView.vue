<script setup lang="ts">
import TaskRecord from '@/components/Task/TaskRecord.vue';
import type { Task } from '@/types/task';

const { task } = defineProps<{ task: Task }>();
</script>

<template>
  <div
    data-cy="task-container"
    class="self-center w-full max-w-xl p-4 bg-white shadow rounded-xl sm:p-7"
  >
    <div
      class="grid gap-2 py-8 border-t border-gray-200 sm:grid-cols-12 sm:gap-4 first:pt-0 last:pb-0 first:border-transparent"
    >
      <div class="sm:col-span-12">
        <h2 class="text-lg font-semibold text-gray-800">Task details</h2>
      </div>

      <TaskRecord
        :class="{ 'border border-red-500 font-semibold text-red-500': !task.completed }"
      >
        <feather
          :type="task.completed ? 'check' : 'x'"
          :data-cy="task.completed ? 'check' : 'x'"
        />
        <span class="ml-3 text-sm">{{
          task.completed ? 'Completed' : 'Not Completed'
        }}</span>
      </TaskRecord>

      <TaskRecord>
        <span class="ml-3 text-sm">{{ task.name }}</span>
      </TaskRecord>

      <TaskRecord v-if="task.dueDate">
        <span class="ml-3 text-sm">{{ task.dueDate }}</span>
      </TaskRecord>
    </div>
  </div>
</template>
