import AbstractView from './abstract.js';


const createStatisticFilterTemplate = (filter) => {
  const {selectedFilterType} = filter;
  return `    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="ALL_TIME" ${selectedFilterType === 'ALL_TIME' ? 'checked' : ''} >
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="TODAY" ${selectedFilterType === 'TODAY' ? 'checked' : ''}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="WEEK" ${selectedFilterType === 'WEEK' ? 'checked' : ''}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="MONTH" ${selectedFilterType === 'MONTH' ? 'checked' : ''}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="YEAR" ${selectedFilterType === 'YEAR' ? 'checked' : ''}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>`;
};

export default class StatisticFilterView extends AbstractView {
  constructor(filter) {
    super();
    this._filterChangeHandel = this._filterChangeHandel.bind(this);
    this._filter = filter;
  }

  getTemplate() {
    return createStatisticFilterTemplate(this._filter);
  }

  _filterChangeHandel(evt) {
    evt.preventDefault();
    this._callback.statsFilterType(evt.target.value);
  }

  setFilterChangeHandel(callback) {
    this._callback.statsFilterType = callback;
    this.getElement().querySelectorAll('.statistic__filters-input').forEach((filter) => {
      filter.addEventListener('change', this._filterChangeHandel);
    });
  }
}

