import TabItem from './TabItem.vue';

describe('<TabItem />', () => {
  context('renders tab item', () => {
    it('default tab', () => {
      cy.mount(TabItem, {
        propsData: {
          tab: { label: 'Tab 1', value: 'tab-1' },
          active: false,
          disabled: false,
        },
      });

      cy.dataCy('tab-1').should('be.visible').should('not.have.attr', 'disabled');
    });

    it('active tab', () => {
      cy.mount(TabItem, {
        propsData: {
          tab: { label: 'Tab 1', value: 'tab-1' },
          active: true,
          disabled: false,
        },
      });

      cy.dataCy('tab-1').should('be.visible').should('not.have.attr', 'disabled');
    });

    it('disabled tab', () => {
      cy.mount(TabItem, {
        propsData: {
          tab: { label: 'Tab 1', value: 'tab-1' },
          active: false,
          disabled: true,
        },
      });

      cy.dataCy('tab-1')
        .should('be.visible')
        .should('have.class', 'pointer-events-none')
        .should('have.attr', 'disabled');
    });
  });

  context('when clicked', () => {
    it('calls handler', () => {
      const onClickSpy = cy.spy().as('onClickSpy');

      cy.mount(TabItem, {
        propsData: {
          tab: { label: 'Tab 1', value: 'tab-1' },
          active: false,
          disabled: false,
        },
        listeners: {
          tabSelected: onClickSpy,
        },
      });

      cy.get('button').contains('Tab 1').click();
      cy.get('@onClickSpy').should('have.been.calledOnce');
    });

    it('doesnt call handler on disabled button', () => {
      const onClickSpy = cy.spy().as('onClickSpy');

      cy.mount(TabItem, {
        propsData: {
          tab: { label: 'Tab 1', value: 'tab-1' },
          active: false,
          disabled: true,
        },
        listeners: {
          tabSelected: onClickSpy,
        },
      });

      cy.get('button').contains('Tab 1').click({ force: true });
      cy.get('@onClickSpy').should('not.have.been.calledOnce');
    });
  });
});
