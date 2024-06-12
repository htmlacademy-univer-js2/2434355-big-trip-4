import MockService from './service/mock-service.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripView from './view/trip-view.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import { render, RenderPosition } from './framework/render.js';

const siteMainElement = document.querySelector('.page-main');

const tripContainer = {
  mainElement: siteMainElement,
  tripMain: document.querySelector('.trip-main'),
  eventListElement: siteMainElement.querySelector('.trip-events'),
  filtersElement: document.querySelector('.trip-controls__filters')
};

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const eventsModel = new EventsModel(mockService);

const tripPresenter = new TripPresenter({ tripContainer, eventsModel, offersModel, destinationsModel });
render(new TripView(), tripContainer.mainElement, RenderPosition.AFTERBEGIN);
tripPresenter.init();
