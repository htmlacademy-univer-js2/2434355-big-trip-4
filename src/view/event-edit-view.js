import AbstractStatefulView from '../framework/view/abstract-view.js';
import { humanizeEventDate } from '../utils/event.js';
import { DATE_FORMAT, EVENT_TYPES, DESTINATIONS } from '../const.js';

const createEventPhotosTemplate = ({ currentDestination }) =>
  `<div class="event__photos-tape">
    ${currentDestination.pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
  </div>`;

const createOffersTemplate = (currentOffers, selectedOffers) => {
  currentOffers.map((offer) => {
    const offerType = offer.title;
    `<div class="event__offer-selector">
    <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offerType}-${offer.id}"
        type="checkbox"
        name="event-offer-${offerType}"
        ${selectedOffers.includes(offer.id) ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-${offerType}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.offerPrice}</span>
        </label>
    </div>`.join('');
  });
};

const createEventTypesList = (currentType) => {
  EVENT_TYPES.map((type) =>
    `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`).join('');
};

const createDestinationsTemplate = () =>
  `<datalist id="destination-list-1">
  ${DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join('')}
  </datalist>`;


function createEventEditTemplate({state, destinations, offers}) {
  const {event} = state;
  const {id, type, basicPrice, dateFrom, dateTo} = event;
  const currentOffers = offers.find((offer) => offer.type === type);
  const currentDestination = destinations.find((destination) => destination.id === event.destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${createEventTypesList(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-${id}"
              type="text"
              name="event-destination"
              value="${currentDestination ? currentDestination.name : ''}"
              list="destination-list-${id}"
            >
            <datalist id="destination-list-${id}">
              ${createDestinationsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-${id}"
              type="text"
              name="event-start-time"
              value="${humanizeEventDate(dateFrom, DATE_FORMAT)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-${id}"
              type="text"
              name="event-end-time"
              value="${humanizeEventDate(dateTo, DATE_FORMAT)}"
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-${id}"
              type="number" min="0"
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

        ${(currentOffers.length !== 0) ? `<section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${createOffersTemplate({currentOffers})}
              </div>
            </section>` : ''}

        ${currentDestination ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>
            <div class="event__photos-container">
              ${createEventPhotosTemplate(currentDestination)}</div>` : ''}
          </section>
        </section>
      </form>
    </li>`
  );
}
export default class EventEditView extends AbstractStatefulView{
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleFormReset = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({event = EVENT_EMPTY, destinations, offers, onFormSubmit, onFormReset}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;

    this._setState(EventEditView.parseEventToState({event}));
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  reset = (event) => this.updateElement({event});

  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers = () => {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetFormHandler);

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetFormHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.#setDatepickers();
  };

  #setDatepickers() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const baseConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true,
    };
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToEvent(this._state));
  };

  #resetFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormReset();
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      event: {
        ...this._state.event,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value).id;
    this.updateElement({
      event: {
        ...this._state.event,
        destination: selectedDestination
      }
    });
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      event: {
        ...this._state.event,
        offers: selectedOffers.map((element) => element.id)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      event: {
        ...this._state.event,
        basicPrice: evt.target.value
      }
    });
  };

  static parseEventToState = ({event}) => ({event});
  static parseStateToEvent = (state) => state.event;
}
