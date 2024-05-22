import {render, RenderPosition} from './framework/render.js';
import TripView from './view/trip-view.js';
import FilterView from './view/filter-view.js';
import EventPresenter from './presenter/trip-presenter.js';
import EventModel from './model/events-model.js';
import {generateFilter} from './mock/filter.js';

const tripElement = document.querySelector('.trip-main');
const filtersElement = tripElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const eventsModel = new EventModel();
const eventsPresenter = new EventPresenter({eventsContainer: eventsElement, eventsModel});
const filters = generateFilter(eventsModel.events);

render(new TripView({eventsModel}), tripElement, RenderPosition.AFTERBEGIN);
render(new FilterView({filters}), filtersElement);

eventsPresenter.init();
