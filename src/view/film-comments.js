import Smart from './smart.js';
import dayjs from "dayjs";

const createFilmComment = (comment) => {
  const {emotion, author, date, text, isDeleting} = comment;
  return `<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="/images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">${text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${author}</span>
                    <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD hh:mm')}</span>
                    <button ${isDeleting ? 'disabled' : ''} class="film-details__comment-delete">${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  </p>
                </div>
              </li>`;
};

export default class FilmCommentView extends Smart {
  constructor(comment) {
    super();
    this._comment = comment;

    this._addCommentDeleteHandler = this._addCommentDeleteHandler.bind(this);
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }

  restoreHandlers() {
    this.setCommentDeleteHandler(this._callback.deleteCommentClick);
  }

  _addCommentDeleteHandler(evt) { //исправить название
    evt.preventDefault();
    this._callback.deleteCommentClick(this._comment.id);
    this.updateData({isDeleting: true});
  }

  setCommentDeleteHandler(callback) {
    this._callback.deleteCommentClick = callback;
    const deleteButton = this.getElement().querySelector('.film-details__comment-delete');
    deleteButton.addEventListener('click', this._addCommentDeleteHandler);
  }

  static parseCommentToData(comment) {
    return Object.assign(
      {},
      comment,
      {
        isDeleting: false,
      },
    );
  }
}
