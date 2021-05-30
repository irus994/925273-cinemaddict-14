import MovieList from './presenter/films-list.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filters-sitemenu-model.js';
import SortModel from './model/sort-model.js';
import {Api, AUTHORIZATION, END_POINT} from './api.js';
import {UpdateType} from './utils/const.js';
import MenuModel from './model/menu-model.js';
import FooterFilmsCountView from './view/footer-film-count.js';
import {renderElement, RenderPosition} from './utils/render.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');
const siteFooterStatistic = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const sortModel = new SortModel();
const menuModel = new MenuModel();
const movieListPresenter = new MovieList(siteHeaderElement, siteMainElement, siteBodyElement, moviesModel, filterModel, sortModel, menuModel, api);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    renderElement(siteFooterStatistic, new FooterFilmsCountView(movies.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

movieListPresenter.init();

