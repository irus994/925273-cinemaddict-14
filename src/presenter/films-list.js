import FilmCardContainerView from '../view/film-card-container.js';
import FilmContentView from '../view/main-content.js';
import UserRankView from '../view/user-rank.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import {remove, renderElement, RenderPosition} from '../utils/render.js';
import FilmCardPresenter from '../presenter/film-card.js';
import FiltersSiteMenuPresenter from '../presenter/filters.js';
import {UserAction, UpdateType, FilterType, MenuItem, SortType} from '../utils/const.js';
import {filters} from '../utils/const.js';
import {sort} from '../utils/const.js';
import SortMoviesPresenter from '../presenter/sort.js';
import LoadingView from '../view/loading.js';
import EmptyFilmListView from '../view/empty-film-list.js';
import StatsPresenter from '../presenter/stats.js';

const FILMS_COUNT_START = 5;
let renderedFilmCount = FILMS_COUNT_START;

export default class MovieList {
  constructor(siteHeaderElement, siteMainElement, siteBodyElement, moviesModel, filtersModel, sortModel, menuModel, api) {
    this._moviesModel = moviesModel;
    this._filtersModel = filtersModel;
    this._sortModel = sortModel;
    this._menuModel = menuModel;
    this._siteMainElement = siteMainElement;
    this._siteBodyElement = siteBodyElement;
    this._siteHeaderElement = siteHeaderElement;
    this._filmCardContainer = new FilmCardContainerView();
    this._filmContent = new FilmContentView();
    this._filmCardPresenter = {};
    this._filtersSiteMenuPresenter = {};
    this._sortMoviesPresenter = {};
    this._isLoading = true;
    this._api = api;
    this._commentDeleteError = null;
    this._commentAddError = null;
    this._commentAddDate = null;

    this._changeStatus = this._changeStatus.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._userRank = new UserRankView();
    this._showMoreButton = new ShowMoreButtonView();
    this._sortMoviesPresenter = new SortMoviesPresenter(this._siteMainElement, this._moviesModel, this._sortModel);
    this._filtersSiteMenuPresenter = new FiltersSiteMenuPresenter(this._siteMainElement, this._filtersModel, this._moviesModel, this._menuModel);
    this._statsPresenter = new StatsPresenter(this._siteMainElement, this._moviesModel);
    this._loadingComponent = new LoadingView();
    this._emptyFilmList = new EmptyFilmListView();
  }

  init() {
    this._renderFilmContent();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._sortModel.addObserver(this._handleModelEvent);
    this._menuModel.addObserver(this._handleModelEvent);

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

  _renderStatistic() {
    this._statsPresenter.init();
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
    remove(this._userRank);
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
    const movies = this._getMovies();
    if (movies.length > FILMS_COUNT_START) {
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

  _changeStatus() {
    Object.values(this._filmCardPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    this._commentAddDate = null;
    switch (actionType) {
      case UserAction.RE_RENDER:
        this._moviesModel.reRender(updateType, update);
        break;
      case UserAction.UPDATE_MOVIE:
        this._api.updateMovie(update).then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        {
          const {movieId, comment} = update;
          this._api.addComment(comment, movieId)
            .then((response) => {
              this._filmCardPresenter[movieId].setComments(response.comments);
              this._moviesModel.updateMovie(updateType, response.movie);
            })
            .catch(() => {
              this._commentAddDate = comment;
              this._commentAddError = movieId;
              this._moviesModel.reRender(updateType, this._getMovies().find((movie) => {
                return movie.id === movieId;
              }));
            });
        }
        break;
      case UserAction.DELETE_COMMENT: {
        const movieId = update.movieId;
        const commentId = update.commentId;
        this._api.deleteComment(commentId)
          .then(() => {
            this._moviesModel.deleteComment(updateType, movieId, commentId);
          })
          .catch(() => {
            this._commentDeleteError = commentId;
            this._moviesModel.reRender(updateType, this._getMovies().find((movie) => {
              return movie.id === movieId;
            }));
          });
      }
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmCardPresenter[data.id].init(data, this._commentDeleteError, this._commentAddError === data.id, this._commentAddDate);
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
      case UpdateType.NONE:
        break;
    }
    this._commentDeleteError = null;
    this._commentAddError = null;
    this._commentAddDate = null;
  }

  destroy() {
    this._clear({resetSortType: true});

    remove(this._renderFilmContent);
    remove(this._renderFilmCardContainer);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filtersModel.removeObserver(this._handleModelEvent);
    this._sortModel.removeObserver(this._handleModelEvent);
  }

  _clear({resetSortType = false} = {}) {
    if (resetSortType) {
      this._sortModel.setSort(UpdateType.NONE, SortType.DEFAULT);
    }
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._showMoreButton);
    remove(this._loadingComponent);

    renderedFilmCount = FILMS_COUNT_START;
  }

  _hideFilmList() {
    this._filmContent.getElement().style.display = 'none';
    this._sortMoviesPresenter.hide();
  }

  _showFilmList() {
    this._filmContent.getElement().style.display = null;
    this._sortMoviesPresenter.show();
  }

  _render() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    if (this._menuModel.getMenuItem() === MenuItem.STATISTICS) {
      this._hideFilmList();
      this._renderStatistic();
    } else {
      this._statsPresenter.destroy();
      this._showFilmList();
      if (this._getMovies().length === 0) {
        this._renderEmptyFilmList();
        this._sortMoviesPresenter.destroy();
      } else {
        this._renderSortList();
        this._renderFilmCardContainer();
        this._renderUserRank();
        this._renderShowMoreButton();
      }
    }
    this._renderSiteMenu();
  }
}

