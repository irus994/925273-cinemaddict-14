
import AbstractView from './abstract';
import {UserRankThreshold} from '../utils/const.js';

const createUserRank = (numberOfFilmsWatched) => {
  return `<section class="header__profile profile">
    ${numberOfFilmsWatched >= UserRankThreshold.NONE && numberOfFilmsWatched < UserRankThreshold.NOVICE ? '' : ''}
    ${numberOfFilmsWatched >= UserRankThreshold.NOVICE && numberOfFilmsWatched < UserRankThreshold.FAN ? '<p class="profile__rating">Novice</p>' : ''}
    ${numberOfFilmsWatched >= UserRankThreshold.FAN && numberOfFilmsWatched < UserRankThreshold.MOVIE_BUFF ? '<p class="profile__rating">Fan</p>' : ''}
    ${numberOfFilmsWatched >= UserRankThreshold.MOVIE_BUFF ? '<p class="profile__rating">Movie Buff</p>' : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};


export default class UserRankView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createUserRank(this._numberOfFilmsWatched);
  }

  setNumberOfFilmsWatched(numberOfFilmsWatched) {
    this._numberOfFilmsWatched = numberOfFilmsWatched;
  }
}

