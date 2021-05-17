import {SortType} from '../utils/utils.js';

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
