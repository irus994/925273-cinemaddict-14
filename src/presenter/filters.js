import SiteMenuView from '../view/site-menu.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/render.js';
import {FilterType, MenuItem, UpdateType} from '../utils/const.js';
import {filters} from '../utils/const.js';


export default class FiltersSiteMenu {
  constructor(siteMainElement, filtersModel, moviesModel, menuModel) {
    this._siteMainElement = siteMainElement;
    this._filterModel = filtersModel;
    this._moviesModel = moviesModel;
    this._menuModel = menuModel;

    this._siteMenu = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._addStatisticClickHandler = this._addStatisticClickHandler.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const isEmptyList = false;
    const filters = this._getFilters();

    const prevSiteMenu = this._siteMenu;

    this._siteMenu = new SiteMenuView(filters, this._filterModel.getFilter(), isEmptyList);
    this._siteMenu.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._siteMenu.setStatisticHandler(this._addStatisticClickHandler);

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
    this._menuModel.setMenuItem(UpdateType.MAJOR, MenuItem.MOVIES);
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _addStatisticClickHandler() {
    this._menuModel.setMenuItem(UpdateType.MAJOR, MenuItem.STATISTICS);
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
