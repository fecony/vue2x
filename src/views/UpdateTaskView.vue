<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';
import Whiteboard from '@/components/Whiteboard.vue';
import BackButton from '@/components/Buttons/BackButton.vue';
import ActionButton from '@/components/Buttons/ActionButton.vue';
import TaskForm from '@/components/Task/TaskForm.vue';
import type { Task } from '@/types';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/modules/task/action-types';

const {
  params: { id },
} = useRoute();
const store = useStore();
const router = useRouter();

const task = computed(() => store.getters['task/getByTaskId'](id));

if (!task.value) {
  router.push({ name: 'home' });
}

const handleUpdate = async (task: Omit<Task, 'id'>) => {
  await store.dispatch(`task/${ActionTypes.UPDATE_TASK}`, { id, ...task });
  router.push({ name: 'view-task', params: { id } });
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
      <TaskForm
        :task="task"
        @submit="handleUpdate"
      />
    </Whiteboard>
  </section>
</template>
