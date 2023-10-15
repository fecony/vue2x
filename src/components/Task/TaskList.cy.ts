import type { Task } from '@/types';
import { formatDate } from '@/utils/date';
import moment from 'moment';
import TaskList from './TaskList.vue';

describe('<TaskList />', () => {
  it('task items should be displayed correctly', () => {
    const tasks = [
      {
        id: '1',
        name: 'Test task 1',
        completed: false,
      },
      {
        id: '2',
        name: 'Test task 2',
        completed: true,
      },
      {
        id: '3',
        name: 'Test task 3',
        completed: false,
        dueDate: moment().add(5, 'days').toISOString(),
      },
    ];

    cy.mount(TaskList, {
      propsData: {
        tasks,
      },
    });

    cy.dataCy('task-link').each(($link, index) => {
      const task = tasks.at(index) as Task;

      cy.wrap($link).within(() => {
        cy.contains(task.name).should('be.visible');
        cy.wrap($link)
          .children()
          .dataCy('task-checkbox')
          .should('be.visible')
          .should(task.completed ? 'be.checked' : 'not.be.checked');

        if (task.dueDate) {
          cy.wrap($link)
            .children()
            .dataCy('task-due-date')
            .should('be.visible')
            .contains(formatDate(task.dueDate));
        }
      });
    });
  });
});
