<script setup lang="ts">
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { reactive } from 'vue';
import type { Task } from '@/types';

const { task } = defineProps<{ task?: Partial<Task> }>();
const emit = defineEmits(['submit']);

const taskForm = reactive({
  name: '',
  completed: false,
  dueDate: '',
  ...task,
});

const onSubmit = () => {
  emit('submit', taskForm);
};
</script>

<template>
  <div class="self-center w-full max-w-xl p-4 bg-white shadow rounded-xl sm:p-7">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        data-cy="task-form"
        id="task-form"
        @submit.prevent="handleSubmit(onSubmit)"
      >
        <div
          class="grid gap-2 py-8 border-t border-gray-200 sm:grid-cols-12 sm:gap-4 first:pt-0 last:pb-0 first:border-transparent"
        >
          <div class="sm:col-span-12">
            <h2 class="text-lg font-semibold text-gray-800">Task details</h2>
          </div>

          <ValidationProvider
            class="sm:col-span-12"
            name="Completed"
            data-cy="task-checkbox"
          >
            <label
              for="task-completed"
              class="flex w-full p-3 text-sm bg-white border border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500"
            >
              <input
                type="checkbox"
                v-model="taskForm.completed"
                class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                id="task-completed"
              />
              <span class="ml-3 text-sm text-gray-500">Completed</span>
            </label>
          </ValidationProvider>

          <ValidationProvider
            class="sm:col-span-12"
            name="Name"
            rules="required"
            v-slot="{ errors }"
            data-cy="task-name"
          >
            <div class="flex rounded-md shadow-sm">
              <span
                class="inline-flex items-center px-4 text-sm text-gray-500 border border-r-0 border-gray-200 min-w-fit rounded-l-md bg-gray-50"
              >
                Name
              </span>
              <input
                v-model.trim="taskForm.name"
                type="text"
                class="block w-full px-4 py-3 text-sm border-gray-200 shadow-sm pr-11 rounded-r-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <p
              v-show="errors[0]"
              class="mt-2 text-sm text-red-600"
              data-cy="task-error"
            >
              {{ errors[0] }}
            </p>
          </ValidationProvider>

          <ValidationProvider
            class="sm:col-span-12"
            name="DueDate"
            data-cy="task-due-date"
          >
            <div class="flex rounded-md shadow-sm">
              <span
                class="inline-flex items-center px-4 text-sm text-gray-500 border border-r-0 border-gray-200 min-w-fit rounded-l-md bg-gray-50"
              >
                Due Date
              </span>
              <input
                type="datetime-local"
                v-model="taskForm.dueDate"
                class="block w-full px-4 py-3 text-sm border-gray-200 shadow-sm rounded-r-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
