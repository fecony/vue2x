import moment from 'moment';
import TaskItem from './TaskItem.vue';
import { formatDate } from '@/utils/date';

describe('<TaskItem />', () => {
  it('should have link to task item', () => {
    const task = {
      id: '1',
      name: 'Test task',
      completed: false,
    };

    cy.mount(TaskItem, {
      propsData: {
        task,
      },
    });

    cy.contains(task.name).should('be.visible');
    cy.dataCy('task-link')
      .should('be.visible')
      .should(($a) => {
        const message = $a.text();
        expect($a, message).to.have.attr('href').to.contain(task.id);
      });
  });

  it('renders simple task item', () => {
    const task = {
      id: '1',
      name: 'Test task',
      completed: false,
    };

    cy.mount(TaskItem, {
      propsData: {
        task,
      },
    });

    cy.contains(task.name).should('be.visible');
    cy.dataCy('task-checkbox').should('be.visible').should('not.be.checked');
  });

  it('renders task as completed', () => {
    const task = {
      id: '1',
      name: 'Test task',
      completed: true,
    };

    cy.mount(TaskItem, {
      propsData: {
        task,
      },
    });

    cy.contains(task.name).should('be.visible');
    cy.dataCy('task-checkbox').should('be.visible').should('be.checked');
  });

  it('renders task with dueDate in future', () => {
    const task = {
      id: '1',
      name: 'Test task',
      completed: false,
      dueDate: moment().add(5, 'days').toISOString(),
    };

    cy.mount(TaskItem, {
      propsData: {
        task,
      },
    });

    cy.contains(task.name).should('be.visible');
    cy.dataCy('task-due-date').should('be.visible').contains(formatDate(task.dueDate));
    cy.dataCy('task-checkbox').should('be.visible').should('not.be.checked');
  });
});
