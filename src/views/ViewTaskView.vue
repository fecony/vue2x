<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';

import Whiteboard from '@/components/Whiteboard.vue';
import BackButton from '@/components/Buttons/BackButton.vue';
import TaskView from '@/components/Task/TaskView.vue';
import BaseLinkButton from '@/components/Buttons/BaseLinkButton.vue';
import ActionButton from '@/components/Buttons/ActionButton.vue';

import { ActionTypes } from '@/store/modules/task/action-types';
import { ActionTypes as UIActionTypes } from '@/store/modules/ui/action-types';

const store = useStore();
const route = useRoute();
const router = useRouter();

const id = computed(() => route.params.id);

const task = computed(() => store.getters['task/getByTaskId'](id.value));

if (!task.value) {
  router.push({ name: 'home' });
}

const handleDuplicate = async () => {
  const taskId = await store.dispatch(`task/${ActionTypes.DUPLICATE_TASK}`, id.value);
  if (taskId) {
    router.replace({ name: 'view-task', params: { id: taskId } });
  }
};

const handleDelete = () => {
  store.dispatch(`ui/${UIActionTypes.OPEN_CONFIRM_DIALOG}`, {
    title: 'Are you sure you want to delete this task?',
    message: 'This action is not revertable and your task will be gone forever',
    confirm: () => {
      store.dispatch(`task/${ActionTypes.DELETE_TASK}`, id.value);
      store.dispatch(`ui/${UIActionTypes.CLOSE_CONFIRM_DIALOG}`);
      router.replace({ name: 'home' });
    },
  });
};
</script>

<template>
  <section
    class="flex flex-col h-full space-y-2 max-h-[70vh]"
    v-if="task"
  >
    <div class="flex justify-between">
      <BackButton />
      <div class="space-x-2">
        <ActionButton
          ghost
          class="font-semibold text-red-500 bg-red-100 border border-transparent hover:!text-white hover:!bg-red-500"
          icon="trash"
          label="Delete"
          @click="handleDelete"
        />
        <ActionButton
          icon="copy"
          label="Duplicate"
          @click="handleDuplicate"
        />
        <BaseLinkButton
          :to="{ name: 'update-task', params: { id: task.id } }"
          label="Update"
          icon="edit"
        />
      </div>
    </div>

    <Whiteboard class="justify-center">
      <TaskView :task="task" />
    </Whiteboard>
  </section>
</template>
