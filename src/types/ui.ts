export type ConfirmationModal = {
  title: string;
  message: string;
  visible: boolean;
  confirm?: () => Promise<void>;
};
