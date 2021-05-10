import SortListView from '../view/sort-list.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/render.js';
import {SortType, UpdateType} from '../utils/utils.js';

export default class SortMoviesPresenter {
  constructor(siteMainElement, moviesModel, sortModel) {
    this._siteMainElement = siteMainElement;
    this._moviesModel = moviesModel;
    this._sortModel = sortModel;
    this._sortList = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._sortModel.addObserver(this._handleModelEvent);
  }

  init() {
    const sorts = this._getSortList();

    const prevSortList = this._sortList;
    this._sortList = new SortListView(sorts);
    this._sortList.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevSortList === null) {
      renderElement(this._siteMainElement, this._sortList, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._sortList, prevSortList);
    remove(prevSortList);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleSortTypeChange(SortType) {
    if (this._sortModel.getSort() === SortType) {
      return;
    }

    this._sortModel.setSort(UpdateType.MINOR, SortType);
  }

  _getSortList() {
    return [
      {
        type: SortType.DEFAULT,
        name: 'Sort by default',
        isActive: this._sortModel.getSort() === SortType.DEFAULT,
      },
      {
        type: SortType.DATE,
        name: 'Sort by date',
        isActive: this._sortModel.getSort() === SortType.DATE,
      },
      {
        type: SortType.RATING,
        name: 'Sort by rating',
        isActive: this._sortModel.getSort() === SortType.RATING,
      },
    ];
  }


}
