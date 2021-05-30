import AbstractView from './abstract.js';

const createStatisticTemplate = (stats) => {
  const {topGenre, watchedFilms, minutes, hours} = stats;
  return `
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilms} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours}<span class="statistic__item-description">h</span> ${minutes}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>`;
};

export default class StatisticView extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats;
  }

  getTemplate() {
    return createStatisticTemplate(this._stats);
  }
}
