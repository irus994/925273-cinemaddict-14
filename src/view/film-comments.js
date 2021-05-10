import AbstractView from './abstract';

const createFilmComment = (comment) => {
  const {emotion, author, date, text} = comment;
  return `<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="/images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
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

    this._addCommentDeleteHandler = this._addCommentDeleteHandler.bind(this);
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }

  _addCommentDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.deleteCommentClick(this._comment.id);
  }

  setCommentDeleteHandler(callback) {
    this._callback.deleteCommentClick = callback;
    const deleteButton = this.getElement().querySelector('.film-details__comment-delete');
    deleteButton.addEventListener('click', this._addCommentDeleteHandler);
  }
}
