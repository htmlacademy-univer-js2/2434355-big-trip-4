import MockService from './service/mock-service.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/events-model.js';

const siteMainElement = document.querySelector('.page-main');

const tripContainer = {
  mainElement: siteMainElement,
  tripMain: document.querySelector('.trip-main'),
  eventListElement: siteMainElement.querySelector('.trip-events'),
  filtersElement: document.querySelector('.trip-controls__filters')
};

const mockService = new MockService();

const eventsModel = new EventsModel(mockService);

const tripPresenter = new TripPresenter({ tripContainer, eventsModel });
tripPresenter.init();
