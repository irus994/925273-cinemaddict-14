
export const UserRankThreshold = {
  NONE: 0,
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 21,
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  NONE: 'NONE',
};

export const MenuItem = {
  MOVIES: 'MOVIES',
  STATISTICS: 'STATISTICS',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  FAVORITES: 'favorites',
  HISTORY: 'history',
};

export const StatsFilterType = {
  ALL_TIME: 'ALL_TIME',
  TODAY: 'TODAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  ADD_COMMENT: 'add',
  DELETE_COMMENT: 'delete',
  UPDATE_MOVIE: 'update',
  RE_RENDER: 're-render',
};

export const sort = {
  [SortType.DEFAULT]: {
    name: 'Sort by default',
    href: '#',
    compare: (film1, film2) => {
      return film1.id - film2.id;
    },
  },
  [SortType.DATE]: {
    name: 'Sort by date',
    href: '#',
    compare: (film1, film2) => {
      return film2.data.getFullYear() - film1.data.getFullYear();
    },
  },
  [SortType.RATING]: {
    name: 'Sort by rating',
    href: '#',
    compare: (film1, film2) => {
      return Number(film1.rating) - Number(film2.rating);
    },
  },
};


export const filters = {
  [FilterType.ALL]: {
    isActive: true,
    name: 'All movies',
    href: '#watchlist',
    predicate: () => {
      return true;
    },
  },
  [FilterType.WATCHLIST]: {
    isActive: false,
    name: 'Watchlist ',
    href: '#watchlist',
    predicate: (film) => {
      return film.userDetails.watchlist;
    },
  },
  [FilterType.HISTORY]: {
    isActive: false,
    name: 'History',
    href: '#history',
    predicate: (film) => {
      return film.userDetails.alreadyWatched;
    },
  },
  [FilterType.FAVORITES]: {
    isActive: false,
    name: 'Favorites ',
    href: '#favorites',
    predicate: (film) => {
      return film.userDetails.favorite;
    },
  },
};
