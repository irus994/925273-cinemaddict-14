import SiteMenuView from '../view/site-menu.js';
import FilmCardView from '../view/film-card.js';
import FilmCardContainerView from '../view/film-card-container.js';
import FilmContentView from '../view/main-content.js';
import UserRankView from '../view/user-rank.js';
import SortListView from '../view/sort-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import CommentedFilmBlockView from '../view/comments-film-block.js';
import TopFilmBlockView from '../view/top-film-block.js';
import PopupFilmView from '../view/popup.js';
import FilmCommentsBlockView from '../view/film-comment-block.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/render.js';
import FilmCardPresenter from '../presenter/film-card.js';
import {updateItem} from '../utils/utils.js';

const FILMS_COUNT = 26;
const FILMS_COUNT_START = 5;
let renderedFilmCount = FILMS_COUNT_START;

export default class MovieList {
  constructor(siteHeaderElement, siteMainElement, siteBodyElement) {
    this._siteMainElement = siteMainElement;
    this._siteBodyElement = siteBodyElement;
    this._siteHeaderElement = siteHeaderElement;
    this._filmCardContainer = new FilmCardContainerView();
    this._filmContent = new FilmContentView();
    this._filmCardPresenter = {};
    this._filmCardPresenterTop = {};
    this._filmCardPresenterComment = {};
    this._siteMenu = null;
    this._changeData = this._changeData.bind(this);
    this._changeStatus = this._changeStatus.bind(this);

    this._userRank = new UserRankView();
    this._sortList = new SortListView();
    this._showMoreButton = new ShowMoreButtonView();
    this._commentedFilmBlock = new CommentedFilmBlockView();
    this._topFilmBlock = new TopFilmBlockView();
    this._popupFilm = new PopupFilmView();
    this._filmCommentsBlock = new FilmCommentsBlockView(); // привязать контекст
  }

  init(films, comments, filters) {
    this._films = films.slice();
    this._comments = comments.slice();
    this._filters = filters.slice();

    this._render();
  }

  _renderSiteMenu() {
    const prevSiteMenu = this._siteMenu;

    this._siteMenu = new SiteMenuView(this._filters, this._films);

    if (prevSiteMenu === null) {
      renderElement(this._siteMainElement, this._siteMenu, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._siteMenu, prevSiteMenu);
    remove(prevSiteMenu);
  }

  _renderFilmCardContainer() {
    renderElement(this._filmContent, this._filmCardContainer, RenderPosition.BEFOREEND);
    const filmCardContainer = this._filmCardContainer.getElement().querySelector('.films-list__container');
    for (let i = 0; i < FILMS_COUNT_START; i++) {
      const filmCardPresenter = new FilmCardPresenter(filmCardContainer, this._changeData, this._siteBodyElement, this._changeStatus);
      filmCardPresenter.init(this._films[i], this._comments);
      this._filmCardPresenter[this._films[i].id] = filmCardPresenter;
    }
  }

  _renderFilmContent() {
    renderElement(this._siteMainElement, this._filmContent, RenderPosition.AFTERBEGIN);
  }

  _renderUserRank() {
    renderElement(this._siteHeaderElement, this._userRank, RenderPosition.BEFOREEND);
  }

  _renderSortList() {
    renderElement(this._siteMainElement, new SortListView().getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderShowMoreButton() {
    if (FILMS_COUNT > FILMS_COUNT_START) {
      const filmList = this._siteMainElement.querySelector('.films-list');
      renderElement(filmList, this._showMoreButton, RenderPosition.BEFOREEND);

      const loadMoreButton = this._siteMainElement.querySelector('.films-list__show-more');
      loadMoreButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        this._films
          .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_START)
          .forEach((film) => {
            const filmCardPresenter = new FilmCardPresenter(this._filmContent.getElement().querySelector('.films-list__container'), this._changeData, this._siteBodyElement, this._changeStatus);
            filmCardPresenter.init(film, this._comments);
            this._filmCardPresenter[film.id] = filmCardPresenter;
          });
        renderedFilmCount = renderedFilmCount + FILMS_COUNT_START;

        if (renderedFilmCount >= this._films.length ) {
          loadMoreButton.remove();
        }
      });
    }
  }

  _renderTopFilmBlock() {
    const CARD_COUNT = 2;
    renderElement(this._siteMainElement.querySelector('.films'), this._topFilmBlock, RenderPosition.BEFOREEND);
    const topFilmBlock = document.querySelector('.films-list--extra');
    const filmTopCardContainer = topFilmBlock.querySelector('.films-list__container');
    for (let i = 0; i < CARD_COUNT; i++) {
      const filmCardPresenter = new FilmCardPresenter(filmTopCardContainer, this._changeData, this._siteBodyElement, this._changeStatus);
      filmCardPresenter.init(this._films[i], this._comments);
      this._filmCardPresenterTop[this._films[i].id] = filmCardPresenter;
    }
  }

  _renderCommentedFilmBlock() {
    const CARD_COUNT = 2;
    renderElement(this._siteMainElement.querySelector('.films'), this._commentedFilmBlock, RenderPosition.BEFOREEND);
    const commentFilmBlock = document.querySelector('.films-list--extra:last-child');
    const filmCommentCardContainer = commentFilmBlock.querySelector('.films-list__container');
    for (let i = 0; i < CARD_COUNT; i++) {
      const filmCardPresenter = new FilmCardPresenter(filmCommentCardContainer, this._changeData, this._siteBodyElement, this._changeStatus);
      filmCardPresenter.init(this._films[i], this._comments);
      this._filmCardPresenterComment[this._films[i].id] = filmCardPresenter;
    }
  }

  _changeStatus() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._filmCardPresenterTop).forEach((presenter) => presenter.resetView());
    Object.values(this._filmCardPresenterComment).forEach((presenter) => presenter.resetView());
  }

  _changeData(updateFilm) { //измененная карточка фильма
    this._films = updateItem(this._films, updateFilm);
    this._filmCardPresenter[updateFilm.id].init(updateFilm, this._comments);
    if (this._filmCardPresenterTop[updateFilm.id]) {
      this._filmCardPresenterTop[updateFilm.id].init(updateFilm, this._comments);
    }
    if (this._filmCardPresenterComment[updateFilm.id]) {
      this._filmCardPresenterComment[updateFilm.id].init(updateFilm, this._comments);
    }
    this._renderSiteMenu();
  }

  _render() {
    this._renderFilmContent();
    this._renderFilmCardContainer();
    this._renderSortList();
    this._renderSiteMenu();
    this._renderUserRank();
    this._renderShowMoreButton();
    this._renderTopFilmBlock();
    this._renderCommentedFilmBlock();
  }
}
