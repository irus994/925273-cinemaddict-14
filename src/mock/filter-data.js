import {FilterType} from '../utils/utils.js';

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

