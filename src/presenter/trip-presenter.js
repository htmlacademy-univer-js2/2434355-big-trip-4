import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NewEventView from '../view/new-event-view.js';
import NoEventView from '../view/no-event-view.js';
import EventPresenter from './event-presenter.js';
import {updateItem} from '../utils/common.js';

export default class TripPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #noEventsComponent = new NoEventView();
  #newEventComponent = new NewEventView;
  #eventPresenters = new Map();

  #tripEvents = [];

  constructor({eventsContainer, eventsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.events];

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #renderSort() {
    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renederNewEvent() {
    render(this.#newEventComponent, this.#eventListComponent.element);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
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
    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderEvent(this.#tripEvents[i]);
    }
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
