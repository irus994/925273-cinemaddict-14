
import AbstractView from './abstract';

const createUserRank = (numberOfFilmsWatched) => {
  return `<section class="header__profile profile">
    ${numberOfFilmsWatched === 0 ? '' : ''}
    ${numberOfFilmsWatched >= 1 && numberOfFilmsWatched <= 10 ? '<p class="profile__rating">Novice</p>' : ''}
    ${numberOfFilmsWatched >= 11 && numberOfFilmsWatched <= 20 ? '<p class="profile__rating">Fan</p>' : ''}
    ${numberOfFilmsWatched >= 21 ? '<p class="profile__rating">Movie Buff</p>' : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};


export default class UserRankView extends AbstractView {

  getTemplate() {
    return createUserRank(this._numberOfFilmsWatched);
  }

  setNumberOfFilmsWatched(numberOfFilmsWatched) {
    this._numberOfFilmsWatched = numberOfFilmsWatched;
  }
}

