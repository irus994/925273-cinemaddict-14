import MovieList from './presenter/films-list.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filters-sitemenu-model.js';
import SortModel from './model/sort-model.js';
import {Api, AUTHORIZATION, END_POINT} from './api.js';
import {UpdateType} from './utils/const.js';
import MenuModel from './model/menu-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

const moviesModel = new MoviesModel();

const filterModel = new FilterModel();
const sortModel = new SortModel();
const menuModel = new MenuModel();

const movieListPresenter = new MovieList(siteHeaderElement, siteMainElement, siteBodyElement, moviesModel, filterModel, sortModel, menuModel, api);
movieListPresenter.init();

