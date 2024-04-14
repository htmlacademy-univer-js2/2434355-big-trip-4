import { mockEvents } from '../mock/event.js';

export default class EventsModel {
  events = [...mockEvents];

  getEvents() {
    return this.events;
  }
}
