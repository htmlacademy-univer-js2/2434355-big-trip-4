import dayjs from 'dayjs';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

export { getRandomInteger, getRandomArrayElement, humanizeEventDueDate, getDateDifference, isFavourite };
