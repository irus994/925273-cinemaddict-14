import {generateFilmData, generateCommentData} from './mock/film-data.js';
import MovieList from './presenter/films-list.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-sitemenu-model.js';
import SortModel from './model/sort-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

const FILMS_COUNT = 26;
const COMMENTS_COUNT = 4;

const films = new Array(FILMS_COUNT).fill().map(generateFilmData);
const comments = new Array(COMMENTS_COUNT).fill().map(generateCommentData);

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const filterModel = new FilterModel();
const sortModel = new SortModel();

const movieListPresenter = new MovieList(siteHeaderElement, siteMainElement, siteBodyElement, moviesModel, filterModel, sortModel);
movieListPresenter.init(comments);

