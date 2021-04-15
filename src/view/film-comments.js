import AbstractView from './abstract';

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

export default class FilmCommentView extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }
}
