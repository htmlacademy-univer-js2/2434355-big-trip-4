import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NewEventView from '../view/new-event-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils/common.js';
import { SortType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/event.js';

export default class TripPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = null;
  #noEventsComponent = new NoEventView();
  #newEventComponent = new NewEventView;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedTripEvents = [];

  #tripEvents = [];

  constructor({eventsContainer, eventsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.events];
    this.#sourcedTripEvents = [...this.#eventsModel.events];
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
    this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents (sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#tripEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripEvents.sort(sortByPrice);
        break;
      default:
        this.#tripEvents = this.#tripEvents.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEventList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renederNewEvent() {
    render(this.#newEventComponent, this.#eventListComponent.element);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsContainer: this.#eventListComponent.element,
      onEventChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#eventsContainer);
    this.#tripEvents.forEach((event) => this.#renderEvent(event));
  }

  #renderTrip() {
    render(this.#eventListComponent, this.#eventsContainer);

    if (this.#tripEvents.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renederNewEvent();
    this.#renderSort();
    this.#renderEventList();
  }
}
