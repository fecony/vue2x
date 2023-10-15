import TaskRecord from './TaskRecord.vue';
import EmptyList from '@/components/Task/EmptyList.vue';

describe('<TaskRecord />', () => {
  it('renders passed slot', () => {
    cy.mount(TaskRecord, {
      slots: {
        default: 'content',
      },
    });

    cy.contains('content').should('be.visible');
  });

  it('renders passed component as slot', () => {
    cy.mount(TaskRecord, {
      slots: {
        default: EmptyList,
      },
    });

    cy.contains('No data to show').should('be.visible');
  });
});
