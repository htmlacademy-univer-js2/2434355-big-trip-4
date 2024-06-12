import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common.js';

const humanizeEventDate = (dueDate, dateFormat) => dayjs(dueDate).format(dateFormat);

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

function isFavoriteEvent () {
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

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function generateDate () {
  return `2024-0${getRandomInteger(1, 6)}-${getRandomInteger(1, 30)} ${getRandomInteger(0, 2)}${getRandomInteger(0, 9)}:${getRandomInteger(0, 5)}${getRandomInteger(0, 9)}`;
}

function sortByDay(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortByPrice(eventA, eventB) {
  return eventA.basicPrice - eventB.basicPrice;
}

function sortByTime(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateTo - eventA.dateFrom).diff(dayjs(eventB.dateTo - eventB.dateFrom));
}

export { humanizeEventDate,
  getDateDifference,
  isFavoriteEvent,
  isEventFuture,
  isEventPast,
  isEventPresent,
  sortByDay,
  sortByPrice,
  sortByTime,
  generateDate};
