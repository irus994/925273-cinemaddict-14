import StatisticView from '../view/statistic.js';
import {remove, renderElement, RenderPosition, replace} from '../utils/render.js';
import {StatsFilterType, FilterType, UpdateType} from '../utils/const.js';
import {filters} from '../utils/const.js';
import StatisticFilterView from '../view/statistics-filter.js';
import StatsUserRang from '../view/stats-user-rang.js';
import StatsContainer from '../view/stats-container.js';
import StatsFilterModel from '../model/stats-filter-model.js';
import StatsChart from '../view/stats-chart.js';

export default class StatsPresenter {
  constructor(siteMainElement, moviesModel) {
    this._siteMainElement = siteMainElement;
    this._moviesModel = moviesModel;
    this._filterModel = new StatsFilterModel();
    this._statsChart = null;
    this._statistic = null;
    this._statisticFilter = null;
    this._statsContainer = null;

    this._filterChangeHandel = this._filterChangeHandel.bind(this);
    this.init = this.init.bind(this);

    this._filterModel.addObserver(this.init);
  }

  init() {
    const prevStatsContainer = this._statsContainer;

    this._statsContainer = new StatsContainer();

    if (prevStatsContainer === null) {
      renderElement(this._siteMainElement, this._statsContainer, RenderPosition.BEFOREEND);
    } else {
      replace(this._statsContainer, prevStatsContainer);
    }
    this._render();
  }

  _render() {
    const movies = this._moviesModel.getMovies();
    const filteredMovies = movies
      .filter(filters[FilterType.HISTORY].predicate)
      .filter(this._getActiveFilter().predicate);


    this._statistic = new StatisticView({
      topGenre: this._getMostPopularGenre(filteredMovies),
      watchedFilms: filteredMovies.length,
      sumDuration: this._getDurationSum(filteredMovies),
    });

    this._statsChart = new StatsChart(this._getGenrePopularity(filteredMovies));

    this._statisticFilter = new StatisticFilterView({selectedFilterType: this._filterModel.getFilter()});
    this._statsUserRang = new StatsUserRang({watchedFilms: filteredMovies.length});
    this._statisticFilter.setFilterChangeHandel(this._filterChangeHandel);

    renderElement(this._statsContainer, this._statsUserRang, RenderPosition.BEFOREEND);
    renderElement(this._statsContainer, this._statisticFilter, RenderPosition.BEFOREEND);
    renderElement(this._statsContainer, this._statistic, RenderPosition.BEFOREEND);
    renderElement(this._statsContainer, this._statsChart, RenderPosition.BEFOREEND);
    this._statsChart.initChart();
  }

  destroy() {
    if (this._statistic === null) {
      return;
    }
    remove(this._statistic);
    this._statistic = null;

    remove(this._statisticFilter);
    this._statisticFilter = null;

    remove(this._statsUserRang);
    this._statsUserRang = null;
  }

  _getGenrePopularity(movies) {
    const filmGenres = {};
    for (let i = 0; i < movies.length; i++) {
      for (let j = 0; j < movies[i].filmGenre.length; j++) {
        filmGenres[movies[i].filmGenre[j]] = (filmGenres[movies[i].filmGenre[j]] || 0) + 1;
      }
    }
    return filmGenres;
  }

  _getMostPopularGenre(movies) {
    const filmGenres = this._getGenrePopularity(movies);
    let mostPopularGenre = '';
    let mostPopularGenreCount = 0;
    Object.keys(filmGenres).forEach((filmGenre) => {
      if (filmGenres[filmGenre] > mostPopularGenreCount) {
        mostPopularGenre = filmGenre;
        mostPopularGenreCount = filmGenres[filmGenre];
      }
    });
    return mostPopularGenre;
  }

  _getDurationSum(movies) {
    let sumFilmDuration = 0;
    for (let i = 0; i < movies.length; i++) {
      const filmDuration = movies[i].duration;
      sumFilmDuration = sumFilmDuration + filmDuration;
    }
    return sumFilmDuration;
  }

  _getFilters() {
    return [
      {
        type: StatsFilterType.ALL_TIME,
        isActive: this._filterModel.getFilter() === StatsFilterType.ALL_TIME,
        predicate: () => {
          return true;
        },
      },
      {
        type: StatsFilterType.TODAY,
        isActive: this._filterModel.getFilter() === StatsFilterType.TODAY,
        predicate: (movie) => {
          const today = new Date();
          today.setHours(0, 0,0,0);
          return movie.userDetails.watchingDate.getTime() > today.getTime();
        },
      },
      {
        type: StatsFilterType.WEEK,
        isActive: this._filterModel.getFilter() === StatsFilterType.WEEK,
        predicate: (movie) => {
          const weekAgo = new Date();
          weekAgo.setHours(0, 0,0,0);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return movie.userDetails.watchingDate.getTime() > weekAgo.getTime();
        },
      },
      {
        type: StatsFilterType.MONTH,
        isActive: this._filterModel.getFilter() === StatsFilterType.MONTH,
        predicate: (movie) => {
          const monthAgo = new Date();
          monthAgo.setHours(0, 0,0,0);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return movie.userDetails.watchingDate.getTime() > monthAgo.getTime();
        },
      },
      {
        type: StatsFilterType.YEAR,
        isActive: this._filterModel.getFilter() === StatsFilterType.YEAR,
        predicate: (movie) => {
          const yearAgo = new Date();
          yearAgo.setHours(0, 0,0,0);
          yearAgo.setFullYear(yearAgo.getFullYear() - 1);
          return movie.userDetails.watchingDate.getTime() > yearAgo.getTime();
        },
      },
    ];
  }

  _getActiveFilter() {
    return this._getFilters().find((filter) => filter.isActive);
  }

  _filterChangeHandel(filterType) {
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
