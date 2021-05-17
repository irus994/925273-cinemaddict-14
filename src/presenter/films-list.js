import FilmCardContainerView from '../view/film-card-container.js';
import FilmContentView from '../view/main-content.js';
import UserRankView from '../view/user-rank.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import CommentedFilmBlockView from '../view/comments-film-block.js';
import TopFilmBlockView from '../view/top-film-block.js';
import PopupFilmView from '../view/popup.js';
import FilmCommentsBlockView from '../view/film-comment-block.js';
import {remove, renderElement, RenderPosition} from '../utils/render.js';
import FilmCardPresenter from '../presenter/film-card.js';
import FiltersSiteMenuPresenter from '../presenter/filters.js';
import {UserAction, UpdateType, FilterType} from '../utils/utils.js';
import {filters} from '../mock/filter-data.js';
import {sort} from '../mock/sort-data.js';
import SortMoviesPresenter from '../presenter/sort.js';
import {SortType} from '../utils/utils.js';
import {generateCommentData} from '../mock/film-data.js';
import LoadingView from '../view/loading.js';
import EmptyFilmListView from '../view/empty-film-list.js';


const FILMS_COUNT = 26;
const FILMS_COUNT_START = 5;
let renderedFilmCount = FILMS_COUNT_START;

export default class MovieList {
  constructor(siteHeaderElement, siteMainElement, siteBodyElement, moviesModel, filtersModel, sortModel, api) {
    this._moviesModel = moviesModel;
    this._filtersModel = filtersModel;
    this._sortModel = sortModel;
    this._siteMainElement = siteMainElement;
    this._siteBodyElement = siteBodyElement;
    this._siteHeaderElement = siteHeaderElement;
    this._filmCardContainer = new FilmCardContainerView();
    this._filmContent = new FilmContentView();
    this._filmCardPresenter = {};
    this._filmCardPresenterTop = {};
    this._filmCardPresenterComment = {};
    this._filtersSiteMenuPresenter = {};
    this._sortMoviesPresenter = {};
    this._siteMenu = null;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._changeStatus = this._changeStatus.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._userRank = new UserRankView();
    this._showMoreButton = new ShowMoreButtonView();
    this._commentedFilmBlock = new CommentedFilmBlockView();
    this._topFilmBlock = new TopFilmBlockView();
    this._popupFilm = new PopupFilmView();
    this._filmCommentsBlock = new FilmCommentsBlockView();
    this._sortMoviesPresenter = new SortMoviesPresenter(this._siteMainElement, this._moviesModel, this._sortModel);
    this._filtersSiteMenuPresenter = new FiltersSiteMenuPresenter(this._siteMainElement, this._filtersModel, this._moviesModel);
    this._loadingComponent = new LoadingView();
    this._emptyFilmList = new EmptyFilmListView();
  }

  init() {
    this._renderFilmContent();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._sortModel.addObserver(this._handleModelEvent);

    this._render();
  }

  _getMovies() {
    const filterType = this._filtersModel.getFilter();
    const sortType = this._sortModel.getSort();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = movies.filter(filters[filterType].predicate);
    return filteredMovies.sort(sort[sortType].compare);
  }

  _renderSortList() {
    this._sortMoviesPresenter.init();
  }

  _renderSiteMenu() {
    this._filtersSiteMenuPresenter.init();
  }

  _renderFilmCardContainer() {
    const filmCardContainer = this._filmCardContainer.getElement().querySelector('.films-list__container');
    const movies = this._getMovies();
    for (let i = 0; i < FILMS_COUNT_START; i++) {
      if (movies[i] === undefined) {
        break;
      }
      const filmCardPresenter = new FilmCardPresenter(filmCardContainer, this._handleViewAction, this._siteBodyElement, this._changeStatus);
      filmCardPresenter.init(movies[i]);
      this._filmCardPresenter[movies[i].id] = filmCardPresenter;
    }
  }

  _renderFilmContent() {
    renderElement(this._siteMainElement, this._filmContent, RenderPosition.AFTERBEGIN);
    renderElement(this._filmContent, this._filmCardContainer, RenderPosition.BEFOREEND);
  }

  _renderUserRank() {
    this._userRank.setNumberOfFilmsWatched(this._getMovies().filter(filters[FilterType.HISTORY].predicate).length);
    renderElement(this._siteHeaderElement, this._userRank, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    renderElement(this._filmContent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyFilmList() {
    renderElement(this._filmContent, this._emptyFilmList, RenderPosition.AFTERBEGIN);
  }

  _renderShowMoreButton() {
    if (FILMS_COUNT > FILMS_COUNT_START) {
      const filmList = this._siteMainElement.querySelector('.films-list');
      renderElement(filmList, this._showMoreButton, RenderPosition.BEFOREEND);

      const loadMoreButton = this._siteMainElement.querySelector('.films-list__show-more');
      loadMoreButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        this._getMovies()
          .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_START)
          .forEach((film) => {
            const filmCardPresenter = new FilmCardPresenter(this._filmContent.getElement().querySelector('.films-list__container'), this._handleViewAction, this._siteBodyElement, this._changeStatus);
            filmCardPresenter.init(film);
            this._filmCardPresenter[film.id] = filmCardPresenter;
          });
        renderedFilmCount = renderedFilmCount + FILMS_COUNT_START;

        if (renderedFilmCount >= this._getMovies().length ) {
          loadMoreButton.remove();
        }
      });
    }
  }

  _renderTopFilmBlock() {
    const CARD_COUNT = 2;
    const movies = this._getMovies();
    renderElement(this._siteMainElement.querySelector('.films'), this._topFilmBlock, RenderPosition.BEFOREEND);
    const topFilmBlock = document.querySelector('.films-list--extra');
    const filmTopCardContainer = topFilmBlock.querySelector('.films-list__container');
    for (let i = 0; i < CARD_COUNT; i++) {
      if (movies[i] === undefined) {
        break;
      }
      const filmCardPresenter = new FilmCardPresenter(filmTopCardContainer, this._handleViewAction, this._siteBodyElement, this._changeStatus);
      filmCardPresenter.init(movies[i]);
      this._filmCardPresenterTop[movies[i].id] = filmCardPresenter;
    }
  }

  _renderCommentedFilmBlock() {
    const CARD_COUNT = 2;
    const movies = this._getMovies();
    renderElement(this._siteMainElement.querySelector('.films'), this._commentedFilmBlock, RenderPosition.BEFOREEND);
    const commentFilmBlock = document.querySelector('.films-list--extra:last-child');
    const filmCommentCardContainer = commentFilmBlock.querySelector('.films-list__container');
    for (let i = 0; i < CARD_COUNT; i++) {
      if (movies[i] === undefined) {
        break;
      }
      const filmCardPresenter = new FilmCardPresenter(filmCommentCardContainer, this._handleViewAction, this._siteBodyElement, this._changeStatus);
      filmCardPresenter.init(movies[i]);
      this._filmCardPresenterComment[movies[i].id] = filmCardPresenter;
    }
  }

  _changeStatus() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._filmCardPresenterTop).forEach((presenter) => presenter.resetView());
    Object.values(this._filmCardPresenterComment).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.RE_RENDER:
        this._moviesModel.reRender(updateType, update);
        break;
      case UserAction.UPDATE_MOViE:
        this._api.updateMovie(update).then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        {
          const {movieId, comment} = update;
          const userComment = generateCommentData(comment);
          this._comments.push(userComment);
          const movie = this._moviesModel.getMovies().find((movie) => {
            return movie.id === movieId;
          });
          this._moviesModel.updateMovie(updateType, Object.assign(
            {},
            movie,
            {
              comments: movie.comments.concat([userComment.id]),
            },
          ));
        }
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmCardPresenter[data.id].init(data);
        if (this._filmCardPresenterComment[data.id]) {
          this._filmCardPresenterComment[data.id].init(data);
        }
        if (this._filmCardPresenterTop[data.id]) {
          this._filmCardPresenterTop[data.id].init(data);
        }
        break;
      case UpdateType.MINOR:
        this._clear();
        this._render();
        break;
      case UpdateType.MAJOR:
        this._clear({resetSortType: true});
        this._render();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._render();
        break;
    }
  }

  destroy() {
    this._clear({resetSortType: true});

    remove(this._renderFilmContent);
    remove(this._renderFilmCardContainer);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filtersModel.removeObserver(this._handleModelEvent);
    this._sortModel.removeObserver(this._handleModelEvent);
  }

  _clear() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    Object
      .values(this._filmCardPresenterTop)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenterTop = {};

    Object
      .values(this._filmCardPresenterComment)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenterComment = {};

    remove(this._showMoreButton);
    remove(this._topFilmBlock);
    remove(this._commentedFilmBlock);
    remove(this._loadingComponent);

    renderedFilmCount = FILMS_COUNT_START;
  }

  _render() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    if (this._getMovies().length === 0) {
      this._renderEmptyFilmList();
      this._sortMoviesPresenter.destroy();
      return;
    }
    this._renderFilmCardContainer();
    this._renderSiteMenu();
    this._renderSortList();
    this._renderUserRank();
    this._renderShowMoreButton();
    this._renderTopFilmBlock();
    this._renderCommentedFilmBlock();
  }
}

