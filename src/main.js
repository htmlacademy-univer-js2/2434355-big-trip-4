import TripView from './view/trip-view.js';
import FilterView from './view/filter-view.js';
import {RenderPosition, render} from './render.js';
import EventPresenter from './presenter/event-presenter.js';
import EventModel from './model/events-model.js';

const tripElement = document.querySelector('.trip-main');
const filtersElement = tripElement.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const eventsModel = new EventModel();
const eventsPresenter = new EventPresenter({eventsContainer: eventsElement, eventsModel});

render(new TripView(), tripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersElement);

eventsPresenter.init();
