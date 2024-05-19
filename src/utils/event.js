import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common.js';


const humanizeEventDueDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);

const getDateDifference = (dateFrom, dateTo) => {
  const days = dateTo.diff(dateFrom, 'day');
  const hours = dateTo.diff(dateFrom, 'hour') % 24;
  const minutes = dateTo.diff(dateFrom, 'min') % 60;

  const difference = dayjs().set('date', days).set('hour', hours).set('minute', minutes);

  if (days !== 0) {
    return dayjs(difference).format('DD[D] HH[H] mm[M]');
  }

  if (hours !== 0) {
    return dayjs(difference).format('HH[H] mm[M]');
  }

  return dayjs(difference).format('mm[M]');
};

function isFavourite (){
  return Boolean(getRandomInteger(0, 1));
}

function isEventFuture(dueDate) {
  return dueDate && dayjs().isBefore(dayjs(), 'D');
}

function isEventPresent(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function isEventPast(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

export { humanizeEventDueDate, getDateDifference, isFavourite, isEventFuture, isEventPast, isEventPresent};
