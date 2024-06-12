import { generateDestination } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generateEvent } from '../mock/event.js';

import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { DESTINATION_COUNT, OFFER_COUNT, EVENT_COUNT, EVENT_TYPES} from '../const.js';

export default class MockService {
  events = [];
  destinations = [];
  offers = [];

  constructor() {
    this.events = this.generateEvents();
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getEvents() {
    return this.events;
  }

  generateOffers() {
    return EVENT_TYPES.map((type) => {
      const offers = Array.from({length: getRandomInteger(0, OFFER_COUNT)}, () => generateOffer(type));

      const offersWithRandomSelection = offers.map((offer, index) => ({
        ...offer,
        included: index < getRandomInteger(0, offers.length - 1)
      }));

      return {
        type,
        offers: offersWithRandomSelection
      };
    });
  }

  generateDestinations() {
    return Array.from(
      {length: DESTINATION_COUNT},
      () => generateDestination()
    );
  }

  generateEvents() {
    return Array.from({length: EVENT_COUNT}, () => {
      const type = getRandomArrayElement(EVENT_TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const hasOffers = getRandomInteger(0, 1);
      const offersByType = this.offers
        .find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers) ? offersByType
        .slice(0, getRandomInteger(0, OFFER_COUNT))
        .map((offer) => offer.id).offers
        : [];

      return generateEvent(type, destination.id, offerIds);
    });
  }
}
