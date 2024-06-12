import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { MIN_OFFER_PRICE, MAX_OFFER_PRICE, OFFERS } from '../const.js';

function generateOffer () {
  const offer = getRandomArrayElement(OFFERS);

  return {
    id: crypto.randomUUID(),
    title: offer,
    offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
  };
}

export { generateOffer };
