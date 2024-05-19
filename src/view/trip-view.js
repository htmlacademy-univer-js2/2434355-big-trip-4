import AbstractView from '../framework/view/abstract-view.js';
import { mockDestinations } from '../mock/destination.js';
import { humanizeEventDate } from '../utils/event.js';
import { DATE_FORMAT } from '../const.js';

function getDestination(event) {
  return mockDestinations.find((destination) => destination.id === event.destination);
}

function getTripTitles(events) {
  const destinations = [...new Set(events.map((event) => getDestination(event).name))];
  let title = '';

  destinations.forEach((destination, index) => {
    title += (destinations.length - 1) !== index ? `${destination} &mdash; ` : destination;
  });

  return title;
}

function getTripDate (events) {
  let eventDate = '';
  eventDate += `${humanizeEventDate(events[0].dateFrom, DATE_FORMAT)}&nbsp;&mdash;&nbsp;` +
  `${humanizeEventDate(events.slice(-1)[0].dateTo, DATE_FORMAT).split(' ')}`;

  return eventDate;
}

function getTripCost (events) {
  let cost = 0;
  events.forEach((eventItem) => {
    cost += eventItem.basicPrice;
  });

  return cost;
}


function createTripTemplate(events) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripTitles(events)}</h1>

        <p class="trip-info__dates">${getTripDate(events)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(events)}</span>
      </p>
    </section>`
  );
}

export default class TripView extends AbstractView{
  #eventsModel = null;

  constructor({eventsModel}) {
    super();
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createTripTemplate(this.#eventsModel.events);
  }
}
