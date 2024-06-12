import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common.js';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

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

const Duration = {
  HOUR: 5,
  DAY: 5,
  MIN: 59
};

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

function generateDate ({next}) {
  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(1, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
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
