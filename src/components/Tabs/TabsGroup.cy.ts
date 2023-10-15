import TabsGroup from './TabsGroup.vue';

const tabs = [
  { label: 'Tab 1', value: 'tab-1' },
  { label: 'Tab 2', value: 'tab-2' },
  { label: 'Tab 3', value: 'tab-3' },
];
describe('<TabsGroup />', () => {
  context('displays tabs properly', () => {
    it('single tab', () => {
      cy.mount(TabsGroup, {
        propsData: {
          disabled: false,
          tabs: [{ label: 'Tab 1', value: 'tab-1' }],
          selectedTab: 'fake-tab',
        },
      });

      cy.dataCy('tabs-group').should('be.visible');
      cy.dataCy('tab-1').should('be.visible').should('not.have.attr', 'disabled');
    });

    it('first tab selected by default', () => {
      cy.mount(TabsGroup, {
        propsData: {
          disabled: false,
          tabs: [{ label: 'Tab 1', value: 'tab-1' }],
          selectedTab: 'tab-1',
        },
      });

      cy.dataCy('tabs-group').should('be.visible');
      cy.dataCy('tab-1').should('be.visible').should('not.have.attr', 'disabled');
    });

    it('single selected tab', () => {
      cy.mount(TabsGroup, {
        propsData: {
          disabled: false,
          tabs: [{ label: 'Tab 1', value: 'tab-1' }],
          selectedTab: 'tab-1',
        },
      });

      cy.dataCy('tabs-group').should('be.visible');
      cy.dataCy('tab-1').should('be.visible').should('not.have.attr', 'disabled');
    });

    it('disabled tabs', () => {
      cy.mount(TabsGroup, {
        propsData: {
          disabled: true,
          tabs: [
            { label: 'Tab 1', value: 'tab-1' },
            { label: 'Tab 2', value: 'tab-2' },
          ],
          selectedTab: 'tab-1',
        },
      });

      cy.dataCy('tab-1').should('be.visible').should('have.attr', 'disabled');
    });

    it('mutiple tab items', () => {
      cy.mount(TabsGroup, {
        propsData: {
          disabled: false,
          tabs,
          selectedTab: 'tab-2',
        },
      });

      cy.dataCy('tabs-group').should('be.visible');
      tabs.forEach((tab) => {
        cy.dataCy(tab.value).should('be.visible').should('not.have.attr', 'disabled');
      });
    });

    it('disabled mutiple tab items', () => {
      cy.mount(TabsGroup, {
        propsData: {
          disabled: true,
          tabs,
          selectedTab: 'tab-2',
        },
      });

      cy.dataCy('tabs-group').should('be.visible');
      tabs.forEach((tab) => {
        cy.dataCy(tab.value).should('be.visible').should('have.attr', 'disabled');
      });
    });
  });

  context('event is emited', () => {
    it('on click', () => {
      const onClickSpy = cy.spy().as('onClickSpy');

      cy.mount(TabsGroup, {
        propsData: {
          disabled: false,
          tabs,
          selectedTab: 'tab-2',
        },
        listeners: {
          tabSelected: onClickSpy,
        },
      });

      cy.dataCy('tabs-group').should('be.visible');
      tabs.forEach((tab) => {
        cy.dataCy(tab.value).should('be.visible').should('not.have.attr', 'disabled');
      });

      cy.dataCy('tab-1').click();
      cy.get('@onClickSpy').should('have.been.calledOnceWith', 'tab-1');
    });
  });
});
