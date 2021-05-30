import AbstractView from './abstract.js';
import {UserRankThreshold} from '../utils/const.js';

const createStatsUserRangTemplate = (stats) => {
  const {watchedFilms} = stats;
  return ` <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">
    ${watchedFilms >= UserRankThreshold.NONE && watchedFilms < UserRankThreshold.NOVICE ? '' : ''}
    ${watchedFilms >= UserRankThreshold.NOVICE && watchedFilms < UserRankThreshold.FAN ? '<span class="statistic__rank-label">Novice</span>' : ''}
    ${watchedFilms >= UserRankThreshold.FAN && watchedFilms < UserRankThreshold.MOVIE_BUFF ? '<span class="statistic__rank-label">Fan</span>' : ''}
    ${watchedFilms >= UserRankThreshold.MOVIE_BUFF ? '<span class="statistic__rank-label">Movie Buff</span>' : ''}
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
