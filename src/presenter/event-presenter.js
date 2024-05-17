import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NewWayPointView from '../view/new-way-point-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import TripView from '../view/trip-view.js';

export default class EventPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #tripComponent = new TripView();
  #eventListComponent = new EventListView();

  #tripEvents = [];

  constructor({eventsContainer, eventsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.events];

    render(this.#tripComponent, this.#eventsContainer);
    render(new SortView(), this.#eventsContainer.element);
    render(this.#eventListComponent, this.#tripComponent.element);
    render(new EventEditView({event: this.#tripEvents[0]}), this.#eventListComponent.element);

    for (let i = 1; i < this.#tripEvents.length; i++) {
      render(new EventView({event: this.#tripEvents[i]}), this.#eventListComponent.element);
    }

    render(new NewWayPointView(), this.#tripComponent.element);
  }
}
