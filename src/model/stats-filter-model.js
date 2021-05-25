import Observer from '../utils/observer.js';
import {StatsFilterType} from '../utils/const.js';

export default class StatsFilterModel extends Observer {
  constructor() {
    super();
    this._activeStatsFilter = StatsFilterType.ALL_TIME;
  }

  setFilter(updateType, filter) {
    this._activeStatsFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeStatsFilter;
  }
}
