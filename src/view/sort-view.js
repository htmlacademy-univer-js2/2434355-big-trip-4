import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortViewTemplate(isChecked) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
        <input id="sort-${SortType.DAY}" data-sort-type="${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.DAY}">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
        <input id="sort-${SortType.EVENT}" data-sort-type="${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" disabled>
        <label class="trip-sort__btn" for="sort-${SortType.EVENT}">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
        <input id="sort-${SortType.TIME}"  data-sort-type="${SortType.TIME}"class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.TIME}">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
        <input id="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" ${isChecked ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${SortType.PRICE}">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}">
        <input id="sort-${SortType.OFFERS}" data-sort-type="${SortType.OFFERS}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFERS}" disabled>
        <label class="trip-sort__btn" for="sort-${SortType.OFFERS}">Offers</label>
      </div>
    </form>`);
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortViewTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT'){
      return;
    }

    evt.preventDefault();

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
