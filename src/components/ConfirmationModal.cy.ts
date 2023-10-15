import { useStore } from '@/store';
import { ActionTypes } from '@/store/modules/ui/action-types';
import ConfirmationModal from './ConfirmationModal.vue';

describe('<ConfirmationModal />', () => {
  it('is initially hidden', () => {
    const store = useStore();

    cy.mount(ConfirmationModal, {
      store,
    });

    cy.dataCy('confirmation-modal').should('not.exist');
  });

  it('is visible after calling OPEN_CONFIRM_DIALOG', () => {
    const store = useStore();

    cy.mount(ConfirmationModal, {
      store,
    });

    store.dispatch(`ui/${ActionTypes.OPEN_CONFIRM_DIALOG}`, {
      title: 'Now you see me?',
      message: 'This modal is for cypress',
    });

    cy.dataCy('confirmation-modal').should('exist');
  });

  it('passed content is visible', () => {
    const store = useStore();

    const modalContent = {
      title: 'Now you see me?',
      message: 'This modal is for cypress',
    };

    cy.mount(ConfirmationModal, {
      store,
    });

    store.dispatch(`ui/${ActionTypes.OPEN_CONFIRM_DIALOG}`, modalContent);

    cy.dataCy('confirmation-modal').should('exist');
    cy.contains(modalContent.title).should('be.visible');
    cy.contains(modalContent.message).should('be.visible');
    cy.get('button').should('have.length', 2);
  });

  it('cancel button is hidding modal', () => {
    const store = useStore();

    cy.mount(ConfirmationModal, {
      store,
    });

    store.dispatch(`ui/${ActionTypes.OPEN_CONFIRM_DIALOG}`, {
      title: 'Are you sure you want to delete this task?',
      message: 'This action is not revertable and your task will be gone forever',
    });

    cy.dataCy('confirmation-modal').should('exist');
    cy.dataCy('cancel').click();
    cy.dataCy('confirmation-modal').should('not.exist');
  });

  it('confirm button callback is called', () => {
    const confirmSpy = cy.spy().as('confirmSpy');
    const store = useStore();

    cy.mount(ConfirmationModal, {
      store,
    });

    store.dispatch(`ui/${ActionTypes.OPEN_CONFIRM_DIALOG}`, {
      title: 'Now you see me?',
      message: 'This modal is for cypress',
      confirm: confirmSpy,
    });

    cy.dataCy('confirmation-modal').should('exist');
    cy.dataCy('confirm').click();

    cy.get('@confirmSpy').should('have.been.calledOnce');
  });
});
