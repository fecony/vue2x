import Default from '@/layouts/Default.vue';
import EmptyList from '@/components/Task/EmptyList.vue';

describe('<Default />', () => {
  it('renders page title', () => {
    cy.mount(Default, {
      propsData: {
        title: 'Page Title',
      },
    });

    cy.get('main').should('be.visible');
    cy.get('h1').should('be.visible').should('contain', 'Page Title');
  });

  it('has logo', () => {
    cy.mount(Default, {
      propsData: {
        title: 'Page Title',
      },
    });

    cy.dataCy('home-link').should('have.class', 'router-link-active');
  });

  it('renders passed simple slot content', () => {
    cy.mount(Default, {
      propsData: {
        title: 'Page Title',
      },
      slots: {
        default: 'content',
      },
    });

    cy.get('main').should('be.visible');
    cy.get('h1').should('be.visible').should('contain', 'Page Title');
    cy.contains('content').should('be.visible');
  });

  it('renders passed component as slot content', () => {
    cy.mount(Default, {
      propsData: {
        title: 'Page Title',
      },
      slots: {
        default: EmptyList,
      },
    });

    cy.get('main').should('be.visible');
    cy.get('h1').should('be.visible').should('contain', 'Page Title');
    cy.contains('No data to show').should('be.visible');
  });
});
