import {getTimeFromMinutes, generateFilmDateRelease} from '../utils/utils.js';
import AbstractView from './abstract.js';

const createPopupFilm = (film) => {
  const {name, data, duration, description, poster, director, screenwriters, actors, ageRating, filmGenre, rating, country, originName, userDetails} = film;
  return `
<section class="film-details">
    <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">${originName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${generateFilmDateRelease(data)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getTimeFromMinutes(duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${filmGenre.length > 1 ? 'Genres' : 'Genre' }</td>
                  <td class="film-details__cell">${filmGenre.map((genre) => `<span>${genre}</span>`).join(' ')}</td>
                </tr>

              </table>

              <p class="film-details__film-description">
              ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" ${userDetails.watchlist ? 'checked' : ''} name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" ${userDetails.alreadyWatched ? 'checked' : ''} name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" ${userDetails.favorite ? 'checked' : ''} name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="film-details__bottom-container">

        </div>
      </form>
</section>`;
};

export default class PopupFilmView extends  AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._editClickHandler = this._editClickHandler.bind(this); // сохраняем контекст
    this._addToWatchListPopupHandler = this._addToWatchListPopupHandler.bind(this);
    this._addToWatchedPopupHandler = this._addToWatchedPopupHandler.bind(this);
    this._addToFavoritePopupHandler = this._addToFavoritePopupHandler.bind(this);
    this._editEscClickHandler = this._editEscClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupFilm(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setCloseClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._editClickHandler);
  }

  _editEscClickHandler(evt) {
    evt.preventDefault();
    if (evt.keyCode === 27) {
      this._callback.editEscClick();
    }
  }

  setCloseEscHandler(callback) {
    this._callback.editEscClick = callback;
    document.addEventListener('keydown', this._editEscClickHandler);
  }

  _addToWatchListPopupHandler() {
    this._callback.addToWatchListPopupClick();
  }

  setWatchListPopupHandler(callback) {
    this._callback.addToWatchListPopupClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._addToWatchListPopupHandler);
  }

  _addToWatchedPopupHandler() {
    this._callback.addWatchedPopupClick();
  }

  setWatchedPopupHandler(callback) {
    this._callback.addWatchedPopupClick = callback;
  }

  _addToFavoritePopupHandler() {
    this._callback.addFavoritePopupClick();
  }

  setFavoritePopupHandler(callback) {
    this._callback.addFavoritePopupClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._addToFavoritePopupHandler);
  }
}
