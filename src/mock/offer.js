import { getRandomInteger } from '../utils/common.js';
import { MIN_OFFER_PRICE, MAX_OFFER_PRICE } from '../const.js';

function generateOffers (type) {
  return {
    id: crypto.randomUUID(),
    offerType: type,
    title: type,
    offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
  };
}

export { generateOffers };
