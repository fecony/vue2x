<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import type { Task } from '@/types/task';
import { formatDate, getDueDateDayDifference } from '@/utils/date';
import { ActionTypes } from '@/store/modules/task/action-types';

const { task } = defineProps<{ task: Task }>();

const store = useStore();
const daysDifference = computed(() =>
  task.dueDate ? getDueDateDayDifference(task.dueDate) : Number.MAX_SAFE_INTEGER,
);

const cardClass = computed(() => ({
  'flex flex-col transition border duration-300 rounded-lg snap-center group hover:shadow-sm justify-center':
    true,
  'bg-white': !task.completed && daysDifference.value > 0,
  'bg-red-100 border-red-300': !task.completed && daysDifference.value < 0,
  'bg-slate-50 border-slate-300': task.completed,
  'hover:shadow-slate-200 border-gray-200': !task.completed && daysDifference.value > 0,
}));

const dueDateClass = computed(() => ({
  'text-red-500 font-bold': !task.completed && daysDifference.value < 0,
  'text-yellow-500 font-bold': daysDifference.value > 0 && daysDifference.value <= 7,
  'text-gray-500': daysDifference.value >= 7,
}));

const titleClass = computed(() => ({
  'text-gray-400 group-hover:text-gray-500': task.completed,
  'font-semibold text-gray-800 group-hover:text-blue-600':
    task.completed || daysDifference.value > 0,
  'font-semibold text-red-500 group-hover:text-red-600':
    !task.completed && daysDifference.value < 0,
}));

const updateTaskState = (event: Event) => {
  event.stopPropagation();
  event.stopImmediatePropagation();
  store.dispatch(`task/${ActionTypes.TOGGLE_TASK_COMPLETED_STATE}`, task.id);
};
</script>

<template>
  <router-link
    :to="{ name: 'view-task', params: { id: task.id } }"
    :class="cardClass"
    data-cy="task-link"
  >
    <div class="p-4 md:p-5">
      <div class="flex items-center">
        <input
          data-cy="task-checkbox"
          @click.stop
          @input.stop.prevent="updateTaskState"
          type="checkbox"
          :checked="task.completed"
          :class="[
            'border-gray-200 rounded shrink-0',
            task.completed
              ? 'focus:ring-gray-500 text-gray-600'
              : 'focus:ring-blue-500 text-blue-600',
          ]"
        />

        <div class="ml-4 grow">
          <h3
            class="font-semibold transition-colors"
            :class="titleClass"
          >
            {{ task.name }}
          </h3>
          <p
            v-if="task.dueDate"
            data-cy="task-due-date"
            class="text-xs"
            :class="dueDateClass"
          >
            {{ formatDate(task.dueDate) }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>
