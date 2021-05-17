import AbstractView from './abstract';
import {FilterType} from '../utils/utils.js';

const createSiteMenuTemplate = (filters,  isEmptyList) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filters.map((filter) => filter.type !== FilterType.ALL
    ? `<a href="#${filter.type}" data-filter-type="${filter.type}" class="main-navigation__item ${filter.isActive ? 'main-navigation__item--active' : ''}">${filter.name}<span class="main-navigation__item-count">${isEmptyList ? filter.count = 0 : filter.count}</span></a>`
    : `<a href="#${filter.type}" data-filter-type="${filter.type}" class="main-navigation__item ${filter.isActive ? 'main-navigation__item--active' : ''}">${filter.name}</a>`,
  ).join('')}

    </div>
    <a href="#stats" class="main-navigation__additional main-navigation__additional--active">Stats</a>
  </nav>`;
};

export default class SiteMenuView extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;

    this._addFilterTypeChangeHandler = this._addFilterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  _addFilterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.currentTarget.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => {
      item.addEventListener('click', this._addFilterTypeChangeHandler);
    });
  }
}
