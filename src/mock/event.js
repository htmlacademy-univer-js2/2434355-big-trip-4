import { getRandomInteger } from '../utils/common.js';
import { generateDate, isFavoriteEvent } from '../utils/event.js';
import { MIN_BASIC_PRICE, MAX_BASIC_PRICE } from '../const.js';

function generateEvent (type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    type,
    basicPrice: getRandomInteger(MIN_BASIC_PRICE, MAX_BASIC_PRICE),
    dateFrom: generateDate({next: false}),
    dateTo: generateDate({next: true}),
    destination: destinationId,
    offers: offerIds,
    isFavorite: isFavoriteEvent
  };
}

export { generateEvent };
