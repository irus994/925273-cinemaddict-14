import {createElement} from './utils.js';

const createFilmComment = (comment) => {
  const {emotion, author, date, text} = comment;
  return `<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="${emotion}" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">${text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${author}</span>
                    <span class="film-details__comment-day">${date}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>`;
};

export default class FilmCommentView {
  constructor(comment) {
    this._element = null;
    this._comment = comment;
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }

  getElement() {
    if (!this._element){
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
