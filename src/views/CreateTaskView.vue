<script setup lang="ts">
import { useRouter } from 'vue-router/composables';
import { nanoid } from 'nanoid';
import Whiteboard from '@/components/Whiteboard.vue';
import BackButton from '@/components/Buttons/BackButton.vue';
import ActionButton from '@/components/Buttons/ActionButton.vue';
import TaskForm from '@/components/Task/TaskForm.vue';
import type { Task } from '@/types';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/modules/task/action-types';

const store = useStore();
const router = useRouter();

const handleCreate = async (newTask: Omit<Task, 'id'>) => {
  const payload = {
    id: nanoid(),
    ...newTask,
  };
  store.dispatch(`task/${ActionTypes.CREATE_TASK}`, payload);
  router.push({ name: 'view-task', params: { id: payload.id } });
};
</script>

<template>
  <section class="flex flex-col h-full space-y-2 max-h-[70vh]">
    <div class="flex justify-between">
      <BackButton />
      <ActionButton
        type="submit"
        label="Save"
        form="task-form"
        icon="save"
      />
    </div>

    <Whiteboard class="justify-center">
      <TaskForm @submit="handleCreate" />
    </Whiteboard>
  </section>
</template>
