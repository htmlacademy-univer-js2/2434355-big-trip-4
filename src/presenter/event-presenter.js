import {render, replace} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import NewEventPointView from '../view/new-event-point-view.js';
export default class EventPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #eventListComponent = new EventListView();
  #loadMoreButtonComponent = null;

  #tripEvents = [];

  constructor({eventsContainer, eventsModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.events];

    render(new SortView(), this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);
    render(new NewEventPointView(), this.#eventListComponent.element);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderEvent(this.#tripEvents[i]);
    }
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      onClick: () => {
        replaceEventToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventEditView({
      event,
      onClick: () => {
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToEdit() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceEditToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventListComponent.element);
  }
}
