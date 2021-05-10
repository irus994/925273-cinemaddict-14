import AbstractView from './abstract';

const createSortList = (sorts) => {
  return `<ul class="sort">
    ${sorts.map((sort) =>
    `<li><a href="#" data-sort-type="${sort.type}" class="sort__button ${sort.isActive ? 'sort__button--active' : ''}"> ${sort.name}</a></li>`).join(' ')}
  </ul>`;
};

export default class SortListView extends AbstractView {
  constructor(sorts) {
    super();

    this._sorts = sorts;
    this._addSortTypeChangeHandle = this._addSortTypeChangeHandle.bind(this);
  }

  getTemplate() {
    return createSortList(this._sorts);// разметка html  элемента
  }

  _addSortTypeChangeHandle(evt) {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().querySelectorAll('.sort__button').forEach((item) => {
      item.addEventListener('click', this._addSortTypeChangeHandle);
    });
  }
}
