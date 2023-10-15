import TaskView from './TaskView.vue';

describe('<TaskView />', () => {
  it('displays not completed task details', () => {
    cy.mount(TaskView, {
      propsData: {
        task: {
          id: '1',
          name: 'Test task',
          completed: false,
        },
      },
    });

    cy.get('h2').contains('Task details').should('be.visible');
    cy.contains('Test task').should('be.visible');
    cy.contains('Not Completed').should('be.visible');

    cy.dataCy('x').should('be.visible');
    cy.dataCy('check').should('not.exist');
  });

  it('displays completed task details', () => {
    cy.mount(TaskView, {
      propsData: {
        task: {
          id: '1',
          name: 'Test task',
          completed: true,
        },
      },
    });

    cy.get('h2').contains('Task details').should('be.visible');
    cy.contains('Test task').should('be.visible');
    cy.contains('Completed').should('be.visible');

    cy.dataCy('check').should('be.visible');
    cy.dataCy('x').should('not.exist');
  });

  it('displays due date', () => {
    const task = {
      id: '1',
      name: 'Test task',
      completed: false,
      dueDate: new Date().toISOString(),
    };
    cy.mount(TaskView, {
      propsData: {
        task,
      },
    });

    cy.get('h2').contains('Task details').should('be.visible');
    cy.contains(task.name).should('be.visible');
    cy.contains('Not Completed').should('be.visible');
    cy.contains(task.dueDate).should('be.visible');

    cy.dataCy('x').should('be.visible');
    cy.dataCy('check').should('not.exist');
  });
});
