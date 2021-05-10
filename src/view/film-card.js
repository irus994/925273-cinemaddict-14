import {getTimeFromMinutes} from '../utils/utils.js';
import AbstractView from './abstract';

export const createFilmCard = (film) => {
  const {name, description, poster, productionYear, filmGenre, duration, rating, comments, userDetails} = film;
  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${productionYear}</span>
            <span class="film-card__duration">${getTimeFromMinutes(duration)}</span>
            <span class="film-card__genre">${filmGenre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.slice(0, 138) + '...' : description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._editClickHandler = this._editClickHandler.bind(this); // сохраняем контекст
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToWatchedHandler = this._addToWatchedHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();

  }

  setCloseClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._editClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._editClickHandler);
  }

  _addToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  }

  setWatchListPopupHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addToWatchListHandler);
  }

  _addToWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.addWatchedClick();
  }

  setWatchedHandler(callback) {
    this._callback.addWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._addToWatchedHandler);
  }

  _addToFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.addFavoriteClick();
  }

  setFavoriteHandler(callback) {
    this._callback.addFavoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._addToFavoriteHandler);
  }
}
