import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { generateDate, isFavoriteEvent } from '../utils/event.js';
import { EVENT_TYPES, MIN_BASIC_PRICE, MAX_BASIC_PRICE, DESTINATIONS } from '../const.js';
import dayjs from 'dayjs';
import { generateDestination } from './destination.js';
import { generateOffers } from './offer.js';

function generateEvent () {
  const type = getRandomArrayElement(EVENT_TYPES);

  return {
    id: crypto.randomUUID(),
    type: type,
    basicPrice: getRandomInteger(MIN_BASIC_PRICE, MAX_BASIC_PRICE),
    dateFrom: dayjs(generateDate),
    dateTo: dayjs(generateDate),
    destinations: generateDestination(getRandomArrayElement(DESTINATIONS)),
    offers: Array.from({ length: getRandomInteger(0, 5) }, () => generateOffers(type)),
    isFavorite: isFavoriteEvent()
  };
}

export { generateEvent };
