import SiteMenuView from '../view/site-menu.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/render.js';
import {FilterType, UpdateType} from '../utils/utils.js';
import {filters} from '../mock/filter-data.js';


export default class FiltersSiteMenu {
  constructor(siteMainElement, filtersModel, moviesModel) {
    this._siteMainElement = siteMainElement;
    this._filterModel = filtersModel;
    this._moviesModel = moviesModel;

    this._siteMenu = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const isEmptyList = false;
    const filters = this._getFilters();

    const prevSiteMenu = this._siteMenu;

    this._siteMenu = new SiteMenuView(filters, this._filterModel.getFilter(), isEmptyList);
    this._siteMenu.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevSiteMenu === null) {
      renderElement(this._siteMainElement, this._siteMenu, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._siteMenu, prevSiteMenu);
    remove(prevSiteMenu);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: filters[FilterType.ALL].name,
        count: movies.filter(filters[FilterType.ALL].predicate).length,
        isActive: this._filterModel.getFilter() === FilterType.ALL,
      },
      {
        type: FilterType.FAVORITES,
        name: filters[FilterType.FAVORITES].name,
        count: movies.filter(filters[FilterType.FAVORITES].predicate).length,
        isActive: this._filterModel.getFilter() === FilterType.FAVORITES,
      },
      {
        type: FilterType.HISTORY,
        name: filters[FilterType.HISTORY].name,
        count: movies.filter(filters[FilterType.HISTORY].predicate).length,
        isActive: this._filterModel.getFilter() === FilterType.HISTORY,
      },
      {
        type: FilterType.WATCHLIST,
        name: filters[FilterType.WATCHLIST].name,
        count: movies.filter(filters[FilterType.WATCHLIST].predicate).length,
        isActive: this._filterModel.getFilter() === FilterType.WATCHLIST,
      },
    ];
  }

}
