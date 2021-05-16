import FilmCardView from '../view/film-card.js';
import {renderElement, replace, remove, RenderPosition} from '../utils/render.js';
import PopupFilmView from '../view/popup.js';
import FilmCommentsBlockView from '../view/film-comment-block.js';
import FilmCommentView from '../view/film-comments.js';
import SelectReactionView from '../view/select-reaction.js';
import {UpdateType, UserAction} from '../utils/utils.js';
import {Api, AUTHORIZATION, END_POINT} from '../api.js';

const popupStatus = {
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
};

export default class FilmCard {
  constructor(filmCardContainer, changeData, siteBodyElement, changeStatus) {
    this._filmCardContainer = filmCardContainer;
    this._siteBodyElement = siteBodyElement;
    this._changeData = changeData;
    this._changeStatus = changeStatus;
    this._comments = [];

    this._filmContent = null;
    this._popupStatus = popupStatus.CLOSE;

    this._handleAddWatchListClick = this._handleAddWatchListClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleAddFavoritesClick = this._handleAddFavoritesClick.bind(this);
    this._addCommentDeleteHandler = this._addCommentDeleteHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmContent = this._filmContent;
    const prevPopup = this._filmPopup;

    this._filmContent = this._createFilmCard(film);

    if (prevFilmContent === null) {
      renderElement(this._filmCardContainer, this._filmContent, RenderPosition.BEFOREEND); //здесь должна быть другая функция?
      return;
    }
    replace(this._filmContent, prevFilmContent);
    remove(prevFilmContent);
    if (this._popupStatus === popupStatus.OPEN) {
      replace(this._filmPopup, prevPopup);
      remove(prevPopup);
    }
  }

  destroy() {
    remove(this._filmContent);
    remove(this._filmPopup);
  }

  resetView() {
    if (this._popupStatus !== popupStatus.CLOSE) {
      this._closePopup();
    }
  }

  _openPopup() {
    this._changeStatus();
    this._siteBodyElement.appendChild(this._filmPopup.getElement());
    this._siteBodyElement.classList.add('hide-overflow');
    this._popupStatus = popupStatus.OPEN;
    const api = new Api(END_POINT, AUTHORIZATION);
    api.getComments(this._film)
      .then((comments) => {
        this._comments = comments;
        this._changeData(
          UserAction.RE_RENDER,
          UpdateType.PATCH,
          Object.assign(
            {},
            this._film,
          ),
        );
      });
  }

  _closePopup () {
    this._siteBodyElement.removeChild(this._filmPopup.getElement());
    this._siteBodyElement.classList.remove('hide-overflow');
    this._popupStatus = popupStatus.CLOSE;
  }

  _createFilmCard(film) {
    const filmCard = new FilmCardView(film);
    filmCard.setWatchListPopupHandler(this._handleAddWatchListClick);
    filmCard.setWatchedHandler(this._handleAlreadyWatchedClick);
    filmCard.setFavoriteHandler(this._handleAddFavoritesClick);
    this._filmPopup = this._createPopupBlock(film);
    this._filmPopup.setWatchListPopupHandler(this._handleAddWatchListClick);
    this._filmPopup.setWatchedPopupHandler(this._handleAlreadyWatchedClick);
    this._filmPopup.setFavoritePopupHandler(this._handleAddFavoritesClick);

    filmCard.setCloseClickHandler(this._openPopup);
    this._filmPopup.setCloseClickHandler(this._closePopup);
    this._filmPopup.setCloseEscHandler(this._closePopup);
    return filmCard;
  }

  _createPopupBlock(film) {
    const popupFilm = new PopupFilmView(film);
    const popupBlock = popupFilm.getElement().querySelector('.film-details__bottom-container');
    const filmCommentsBlock = new FilmCommentsBlockView();
    const selectReaction = new SelectReactionView();
    selectReaction.setCommentHandler(this._addCommentHandler);
    renderElement(popupBlock, filmCommentsBlock.getElement(), RenderPosition.BEFOREEND);
    const filmCommentsList = filmCommentsBlock.getElement().querySelector('.film-details__comments-list');

    film.comments.forEach((commentId) => {
      const comment = this._comments.find((comment) => {
        return comment.id === commentId;
      });
      if (comment === undefined) {
        return;
      }
      const filmComment = new FilmCommentView(comment);
      filmComment.setCommentDeleteHandler(this._addCommentDeleteHandler);
      renderElement(filmCommentsList, filmComment, RenderPosition.BEFOREEND);
    });


    renderElement(popupBlock, selectReaction.getElement(), RenderPosition.BEFOREEND);
    return popupFilm;
  }

  _handleAddWatchListClick() {
    this._changeData(
      UserAction.UPDATE_MOViE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: Object.assign(
            {},
            this._film.userDetails,
            {watchlist: !this._film.userDetails.watchlist},
          ),
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      UserAction.UPDATE_MOViE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: Object.assign(
            {},
            this._film.userDetails,
            {alreadyWatched: !this._film.userDetails.alreadyWatched},
          ),
        },
      ),
    );
  }

  _handleAddFavoritesClick() {
    this._changeData(
      UserAction.UPDATE_MOViE,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          userDetails: Object.assign(
            {},
            this._film.userDetails,
            {favorite: !this._film.userDetails.favorite},
          ),
        },
      ),
    );
  }

  _addCommentDeleteHandler(deleteCommentId) {
    this._changeData(
      UserAction.UPDATE_MOViE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: this._film.comments.filter((commentId) => {
            return commentId !== deleteCommentId;
          }),
        },
      ),
    );
  }

  _addCommentHandler(commentData) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {
        movieId: this._film.id,
        comment: commentData,
      },
    );
  }
}
