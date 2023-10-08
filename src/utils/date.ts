import moment from 'moment';

export const currentDateTime = () => moment().local().format('YYYY-MM-DDT00:00');

export const formatDate = (dueDate: string) => {
  return moment.duration(moment(dueDate).diff(moment())).humanize(true);
};

export const getDueDateDayDifference = (dueDate: string) => {
  return moment(dueDate).diff(moment(), 'days');
};
