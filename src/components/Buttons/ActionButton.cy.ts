import ActionButton from './ActionButton.vue';

const buttonTypes = ['button', 'submit', 'reset'];

describe('<ActionButton />', () => {
  context('renders with all buton types', () => {
    buttonTypes.forEach((type) => {
      it(`renders with correct type: ${type}`, () => {
        cy.mount(ActionButton, {
          propsData: {
            type,
            label: `${type} button`,
          },
        });

        cy.dataCy(type.toLowerCase()).should('be.visible');
        cy.contains(`${type} button`).should('be.visible');
      });
    });
  });

  context('renders with basic props', () => {
    it('renders simple button with label', () => {
      cy.mount(ActionButton, {
        propsData: { label: 'Button' },
      });

      cy.contains('Button').should('be.visible');
    });

    it('renders simple button with icon', () => {
      cy.mount(ActionButton, {
        propsData: { icon: 'heart' },
      });

      cy.dataCy('heart').should('be.visible');
    });

    it('renders simple button with label and icon', () => {
      cy.mount(ActionButton, {
        propsData: { label: 'Like', icon: 'heart' },
      });

      cy.dataCy('Like').should('be.visible');
      cy.dataCy('heart').should('be.visible');
      cy.contains('[data-cy=Like]', 'Like');
    });
  });

  context('renders ghost button', () => {
    it('renders default ghost button', () => {
      cy.mount(ActionButton, {
        propsData: { label: 'Ghost', ghost: true },
      });

      cy.contains('Ghost').should('be.visible');
      cy.contains('Ghost').should('not.have.class', 'bg-white');
    });
  });

  context('emits click event', () => {
    it('calls passed handler when clicked', () => {
      const onClickSpy = cy.spy().as('onClickSpy');

      cy.mount(ActionButton, {
        propsData: { type: 'button', label: 'Click me' },
        listeners: {
          click: onClickSpy,
        },
      });

      cy.get('button').contains('Click me').click();
      cy.get('@onClickSpy').should('have.been.calledOnce');
    });
  });
});
