import { mockEvents } from '../mock/event.js';

export default class EventsModel {
  #events = [...mockEvents];

  get events() {
    return this.#events;
  }
}
