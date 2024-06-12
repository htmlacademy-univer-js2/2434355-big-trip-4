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
  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventsModel = null;

  #sortComponent = null;
  #noEventsComponent = new NoEventView();
  #newEventComponent = new NewEventView();
  #eventList = new EventListView();
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedTripEvents = [];

  #events = [];

  constructor({tripContainer, eventsModel, destinationsModel, offersModel}) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.get()];
  }

  init() {
    this.#renderTrip();
  }

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#events.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#events.sort(sortByPrice);
        break;
      default:
        this.#events = this.#events.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  };

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

    render(this.#sortComponent, this.#tripContainer.eventListElement, RenderPosition.AFTERBEGIN);
  }

  #renederNewEvent() {
    render(this.#newEventComponent, this.#eventList.element);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#eventList.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsContainer: this.#eventList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
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
    render(this.#eventList, this.#tripContainer.eventListElement);
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderTrip() {
    if (this.#events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renederNewEvent();
    this.#renderSort();
    this.#renderEventList();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };
}
