// import {generateFilmData, generateCommentData} from './mock/film-data.js';
import {generateCommentData} from './mock/film-data.js';
import MovieList from './presenter/films-list.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-sitemenu-model.js';
import SortModel from './model/sort-model.js';
import {Api, AUTHORIZATION, END_POINT} from './api.js';
import {UpdateType} from './utils/utils.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
  })
  .catch((error) => {
    moviesModel.setMovies(UpdateType.INIT, []);
    console.log(error);
  });

const moviesModel = new MoviesModel();
// moviesModel.setMovies(films);

const filterModel = new FilterModel();
const sortModel = new SortModel();

const movieListPresenter = new MovieList(siteHeaderElement, siteMainElement, siteBodyElement, moviesModel, filterModel, sortModel, api);
movieListPresenter.init();

