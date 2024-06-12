import { getRandomArrayElement, getRandomInteger } from './utils/common.js';

const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DESTINATIONS = [
  'New York',
  'Los Angeles',
  'Chikago',
  'Ostin',
  'San Francisco',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer',
};

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const MIN_VALUE = 1;
const MAX_COUNT_DESCRIPTION = 5;
const MAX_PICTURE_ID = 100;
const URL = 'https://loremflickr.com/248/152?random=';
const MIN_BASIC_PRICE = 400;
const MAX_BASIC_PRICE = 1200;
const MIN_OFFER_PRICE = 20;
const MAX_OFFER_PRICE = 100;
const DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DAY = 'DD/MM/YY';
const DATE_FORMAT_HOURS = 'HH:mm';

const EVENT_EMPTY = {
  id: crypto.randomUUID(),
  type: getRandomArrayElement(EVENT_TYPES),
  basicPrice: getRandomInteger(MIN_BASIC_PRICE, MAX_BASIC_PRICE),
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  offers: '',
  isFavorite: false
};

export { EVENT_TYPES,
  DESTINATIONS,
  TEXT,
  MIN_VALUE,
  MAX_COUNT_DESCRIPTION,
  MAX_PICTURE_ID, URL,
  MIN_BASIC_PRICE,
  MAX_BASIC_PRICE,
  MIN_OFFER_PRICE,
  MAX_OFFER_PRICE,
  DATE_FORMAT,
  DATE_FORMAT_DAY,
  DATE_FORMAT_HOURS,
  FilterType,
  SortType,
  EVENT_EMPTY,
  MODE
};
