import AbstractView from './abstract.js';

const createStatsUserRangTemplate = (stats) => {
  const {watchedFilms} = stats;
  return ` <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">
    ${watchedFilms === 0 ? '' : ''}
    ${watchedFilms >= 1 && watchedFilms <= 10 ? '<span class="statistic__rank-label">Novice</span>' : ''}
    ${watchedFilms >= 11 && watchedFilms <= 20 ? '<span class="statistic__rank-label">Fan</span>' : ''}
    ${watchedFilms >= 21 ? '<span class="statistic__rank-label">Movie Buff</span>' : ''}
</span>
    </p>`;
};

export default class StatsUserRang extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats;
  }

  getTemplate() {
    return createStatsUserRangTemplate(this._stats);
  }
}
