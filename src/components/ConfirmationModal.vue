<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/modules/ui/action-types';

const store = useStore();

const modalInfo = computed(() => store.state.ui.confirmationDialog);

const onCancel = () => {
  store.dispatch(`ui/${ActionTypes.CLOSE_CONFIRM_DIALOG}`);
};

const onConfirm = () => {
  if (modalInfo.value.confirm) {
    modalInfo.value.confirm();
  }
};
</script>

<template>
  <div
    v-if="modalInfo.visible"
    data-cy="confirmation-modal"
    class="fixed z-50"
  >
    <div
      class="fixed inset-0 bg-black/20"
      aria-hidden="true"
    />

    <div class="fixed inset-0 flex items-center justify-center w-screen p-4">
      <div class="max-w-lg p-6 bg-white rounded-lg shadow-2xl">
        <h2 class="text-lg font-bold">{{ modalInfo.title }}</h2>

        <p
          class="mt-2 text-sm text-gray-500"
          v-if="modalInfo.message"
        >
          {{ modalInfo.message }}
        </p>

        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            @click="onCancel"
            data-cy="cancel"
            class="px-4 py-2 text-sm font-medium text-gray-600 rounded bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="onConfirm"
            data-cy="confirm"
            class="px-4 py-2 text-sm font-medium text-red-600 rounded bg-red-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
