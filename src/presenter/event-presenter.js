import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NewWayPointView from '../view/new-way-point-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import {render} from '../render.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new NewWayPointView(), this.eventListComponent.getElement());
    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
