import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeEventDate } from '../utils/event.js';
import { DATE_FORMAT, EVENT_TYPES, DESTINATIONS, EVENT_EMPTY } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createEventPhotosTemplate = ({ currentDestination }) =>
  `<div class="event__photos-tape">
    ${currentDestination.pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
  </div>`;

const createOffersTemplate = ({ offers }) => {
  offers.map((offer) => {
    `<div class="event__offer-selector">
    <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offer.title}-${offer.id}"
        type="checkbox"
        name="event-offer-${offer.title}"
        ${offers.includes(offer.id) ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}">
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


function createEventEditTemplate(event) {
  const {id, type, basicPrice, dateFrom, dateTo, destinations, offers} = event;

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
              value="${destinations}"
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

        ${(offers.length !== 0) ? `<section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${createOffersTemplate(offers)}
              </div>
            </section>` : ''}

        ${destinations ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destinations.description}</p>
            <div class="event__photos-container">
              ${createEventPhotosTemplate(destinations)}</div>` : ''}
          </section>
        </section>
      </form>
    </li>`
  );
}
export default class EventEditView extends AbstractStatefulView{
  #event = null;
  #handleFormSubmit = null;
  #handleFormReset = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({event = EVENT_EMPTY, onFormSubmit, onFormReset}) {
    super();
    this._setState(event);
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormReset = onFormReset;
    this._setState(EventEditView.parseEventToState({event}));

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  reset = (event) => this.updateElement({event});

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers = () => {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetFormHandler);

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetFormHandler);

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setFlatpickr();
  };

  #setFlatpickr() {
    const commonConfig = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      'time_24hr': true,
      locale: {
        firstDayOfWeek: 1,
      }
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelectorAll('.event__input--time')[0],
      {
        ...commonConfig,
        defaultDate: dayjs(this._state.dateFrom).format('DD/MM/YY HH:mm'),
        onClose: this.#editStartDateChangeHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelectorAll('.event__input--time')[1],
      {
        ...commonConfig,
        defaultDate: dayjs(this._state.dateTo).format('DD/MM/YY HH:mm'),
        onClose: this.#editEndDateChangeHandler,
      }
    );
  }

  #editStartDateChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });

    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #editEndDateChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });

    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

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
    const selectedDestination = this.#event.destinations.map((destination) => destination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({
      event: {
        ...this._state.event,
        destination: selectedDestinationId
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
