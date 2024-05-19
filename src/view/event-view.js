import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, getDateDifference } from '../utils/event.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';
import { DATE_FORMAT_DAY, DATE_FORMAT_HOURS } from '../const.js';

function getEventOffers(event) {
  const typeOffer = mockOffers.find((offer) => offer.type === event.type);
  return typeOffer.offers.filter((offer) => event.offers.includes(offer.id));
}

function getDestination(event) {
  return mockDestinations.find((destination) => destination.id === event.destination);
}

function createOffersTemplate(event) {
  const offersTemplate = event.offers
    ? `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getEventOffers(event).map((offer) => `
          <li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.offerPrice}</span>
          </li>
        `).join('')}
      </ul>
    ` : '';

  return offersTemplate;
}

function createEventTemplate(event) {
  const {type, basicPrice, dateFrom, dateTo, isFavorite} = event;
  const offersTemplate = createOffersTemplate(event);
  const destination = getDestination(event);
  const isEventFavorite = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${humanizeEventDate(dateFrom, DATE_FORMAT_DAY)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${humanizeEventDate(dateFrom, DATE_FORMAT_HOURS)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${humanizeEventDate(dateTo, DATE_FORMAT_HOURS)}</time>
          </p>
          <p class="event__duration">${getDateDifference(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basicPrice}</span>
        </p>
        ${offersTemplate}
        <button class="event__favorite-btn ${isEventFavorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventView extends AbstractView {
  #event = null;
  #handleClick = null;
  constructor({event, onClick}) {
    super();
    this.#event = event;
    this.#handleClick = onClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#ClickHandler);
  }

  get template() {
    return createEventTemplate(this.#event);
  }

  #ClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
