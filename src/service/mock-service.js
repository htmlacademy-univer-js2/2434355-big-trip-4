import { generateEvent } from '../mock/event.js';
import { getRandomInteger } from '../utils/common.js';

export default class MockService {
  #events = null;

  constructor() {
    this.#events = this.generateEvents();
  }

  getEvents() {
    return this.#events;
  }

  generateEvents() {
    return Array.from({ length: getRandomInteger(0, 5) }, () =>
      generateEvent());
  }
}
