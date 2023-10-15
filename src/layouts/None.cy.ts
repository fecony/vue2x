import None from './None.vue';
import EmptyList from '@/components/Task/EmptyList.vue';

describe('<None />', () => {
  it('renders', () => {
    cy.mount(None);

    cy.dataCy('home-link').should('have.class', 'router-link-active');
  });

  it('renders passed simple slot content', () => {
    cy.mount(None, {
      slots: {
        default: 'content',
      },
    });

    cy.get('main').should('be.visible');
    cy.contains('content').should('be.visible');
  });

  it('renders passed component as slot content', () => {
    cy.mount(None, {
      slots: {
        default: EmptyList,
      },
    });

    cy.get('main').should('be.visible');
    cy.contains('No data to show').should('be.visible');
  });
});
