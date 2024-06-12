import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { MODE } from '../const.js';

export default class EventPresenter {
  #eventsContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleModeChange = null;
  #handleEventChange = null;
  #event = null;

  #mode = MODE.DEFAULT;

  constructor({eventsContainer, destinationsModel, offersModel, onEventChange, onModeChange}) {
    this.#eventsContainer = eventsContainer;
    this.#handleEventChange = onEventChange;
    this.#handleModeChange = onModeChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      eventDestination: this.#destinationsModel.getById(event.destination),
      eventOffers: this.#offersModel.getByType(event.type),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      eventDestination: this.#destinationsModel.get(),
      eventOffers: this.#offersModel.get(),
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#resetButtonClickHandler
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#eventEditComponent.reset(this.#event);
      this.#replaceEditToEvent();
    }
  }

  #replaceEventToEdit() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceEditToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToEvent();
      this.#eventEditComponent.reset(this.#event);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleEventChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  #handleEditClick = () => {
    this.#replaceEventToEdit();
  };

  #handleFormSubmit = (event) => {
    this.#handleEventChange(event);
    this.#replaceEditToEvent();
  };

  #resetButtonClickHandler = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceEditToEvent();
  };
}
