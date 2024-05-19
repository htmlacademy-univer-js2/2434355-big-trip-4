import { getRandomInteger } from '../utils/common.js';
import { MIN_OFFER_PRICE, MAX_OFFER_PRICE } from '../const.js';

const mockOffers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 1,
        title: 'offer Taxi',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 2,
        title: 'offer Bus',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: 3,
        title: 'offer Train',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 4,
        title: 'offer Ship',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: 5,
        title: 'offer Drive',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 6,
        title: 'offer Flight',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 7,
        title: 'offer Check-in',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 8,
        title: 'offer Sightseeing',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: 9,
        title: 'offer Restaurant',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  }
];

export { mockOffers };
