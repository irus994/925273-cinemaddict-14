import {getTimeFromMinutes} from './utils.js';
import AbstractView from './abstract';

export const createFilmCard = (film) => {
  const {name, description, poster, productionYear, filmGenre, duration, rating, comments} = film;
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
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._editClickHandler = this._editClickHandler.bind(this); // сохраняем контекст
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault(); //зачем здесь удалять действие по умолчанию?
    this._callback.editClick(); //?

  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._editClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._editClickHandler);
  }
}


