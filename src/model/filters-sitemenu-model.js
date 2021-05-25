import Observer from '../utils/observer.js';
import {FilterType} from '../utils/const.js';

export default class MoviesFilterMenu extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  //запись данных в модель
  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  //получение данных из модели
  getFilter() {
    return this._activeFilter;
  }
}
