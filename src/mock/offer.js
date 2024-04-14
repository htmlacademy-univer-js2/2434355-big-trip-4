import { getRandomInteger } from '../utils.js';
import { MIN_OFFER_PRICE, MAX_OFFER_PRICE } from '../const.js';

const mockOffers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: 1,
        title: 'Offer',
        offerPrice: getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
      }
    ]
  }
];

export { mockOffers };
