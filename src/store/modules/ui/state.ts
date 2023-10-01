import type { ConfirmationModal } from '@/types';

export const state: { confirmationDialog: ConfirmationModal } = {
  confirmationDialog: {
    title: '',
    message: '',
    visible: false,
    confirm: undefined,
  },
};

export type State = typeof state;
