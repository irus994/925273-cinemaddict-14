import Observer from '../utils/observer.js';
import {SortType} from '../utils/const.js';

export default class SortModel extends Observer {
  constructor() {
    super();
    this._activeSort = SortType.DEFAULT;
  }

  setSort(updateType, sort) {
    this._activeSort = sort;
    this._notify(updateType, sort);
  }

  getSort() {
    return this._activeSort;
  }
}
