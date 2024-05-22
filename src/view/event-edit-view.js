import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils/event.js';
import { mockOffers } from '../mock/offer.js';
import { mockDestinations } from '../mock/destination.js';
import { DATE_FORMAT } from '../const.js';

function getDestination(event) {
  return mockDestinations.find((destination) => destination.id === event.destination);
}

function createOffersTemplate(event) {
  const typeOffer = mockOffers.find((offer) => offer.type === event.type);
  const offersTemplate = typeOffer
    ? `
      <div class="event__available-offers">
        ${typeOffer.offers.map((offer) => `
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${offer.title}-1"
              type="checkbox"
              name="event-offer-${offer.title}"
              ${event.offers.includes(offer.id) ? 'checked' : ''}
            >
            <label class="event__offer-label" for="event-offer-${offer.title}-1">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.offerPrice}</span>
            </label>
          </div>
        `).join('')}
    ` : '';

  return offersTemplate;
}

function createOffersList(offers) {
  for (const offer of offers) {
    return (
      `<div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
            <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.title}</label>
          </div>
        </fieldset>
      </div>`
    );
  }
}

function createEventEditTemplate(event) {
  const {type, basicPrice, dateFrom, dateTo} = event;
  const offersTemplate = createOffersTemplate(event);
  const destination = getDestination(event);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            ${createOffersList}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination.name}"
              list="destination-list-2"
            >
            <datalist id="destination-list-2">
              ${mockDestinations.map((mockDestination) => `
                <option value="${mockDestination.name}"></option>
              `).join(' ')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${humanizeEventDate(dateFrom, DATE_FORMAT)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${humanizeEventDate(dateTo, DATE_FORMAT)}"
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basicPrice}"
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersTemplate}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EventEditView extends AbstractView{
  #event = null;
  #handleFormSubmit = null;

  constructor({event, onFormSubmit}) {
    super();
    this.#event = event;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEventEditTemplate(this.#event);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#event);
  };
}
