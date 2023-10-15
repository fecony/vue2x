import moment from 'moment';
import TaskForm from './TaskForm.vue';

describe('<TaskForm />', () => {
  it('renders form without task provided', () => {
    cy.mount(TaskForm);

    cy.dataCy('task-form').should('be.visible');
    cy.dataCy('task-checkbox')
      .should('be.visible')
      .within(() => {
        cy.get('#task-completed').should('not.be.checked');
      });
    cy.dataCy('task-name')
      .should('be.visible')
      .within(() => {
        cy.get('input').should('be.empty');
      });
    cy.dataCy('task-due-date')
      .should('be.visible')
      .within(() => {
        cy.get('input').should('be.empty');
      });
  });

  it('cannot submit form when required fields are not filled', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(TaskForm, {
      listeners: {
        submit: onSubmitSpy,
      },
    });

    cy.dataCy('task-error').should('not.be.visible');
    cy.dataCy('task-form').submit();
    cy.dataCy('task-error').should('be.visible');

    cy.get('@onSubmitSpy').should('not.have.been.called');
  });

  it('can submit basic valid form', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');

    cy.mount(TaskForm, {
      listeners: {
        submit: onSubmitSpy,
      },
    });

    cy.dataCy('task-name')
      .should('be.visible')
      .within(() => {
        cy.get('input').type('Testing cypress');
      });

    cy.dataCy('task-form').submit();
    cy.dataCy('task-error').should('not.be.visible');
    cy.get('@onSubmitSpy').should('have.been.calledOnceWith', {
      name: 'Testing cypress',
      completed: false,
      dueDate: '',
    });
  });

  it('can submit valid form with all fields filled', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    const dateAfterFiveDays = moment().add(5, 'days').format('YYYY-MM-DDT15:00');

    cy.mount(TaskForm, {
      listeners: {
        submit: onSubmitSpy,
      },
    });

    cy.dataCy('task-checkbox')
      .should('be.visible')
      .within(() => {
        cy.get('#task-completed').check();
      });

    cy.dataCy('task-name')
      .should('be.visible')
      .within(() => {
        cy.get('input').type('Testing cypress');
      });

    cy.dataCy('task-due-date')
      .should('be.visible')
      .within(() => {
        cy.get('input').clear().type(dateAfterFiveDays);
      });

    cy.dataCy('task-form').submit();
    cy.dataCy('task-error').should('not.be.visible');
    cy.get('@onSubmitSpy').should('have.been.calledOnceWith', {
      name: 'Testing cypress',
      completed: true,
      dueDate: dateAfterFiveDays,
    });
  });
});
