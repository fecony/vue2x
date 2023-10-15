import Whiteboard from './Whiteboard.vue';
import EmptyList from '@/components/Task/EmptyList.vue';

describe('<Whiteboard />', () => {
  it('renders passed slot', () => {
    cy.mount(Whiteboard, {
      slots: {
        default: 'content',
      },
    });

    cy.contains('content').should('be.visible');
  });

  it('renders passed component as slot', () => {
    cy.mount(Whiteboard, {
      slots: {
        default: EmptyList,
      },
    });

    cy.contains('No data to show').should('be.visible');
  });
});
