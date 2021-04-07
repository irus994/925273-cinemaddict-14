export const filters = [
  // {
  //   name: 'All movies',
  //   href: '#watchlist',
  //   predicate: (film) => {
  //     return film.userDetails.allMovies;
  //   },
  // },
  {
    name: 'Watchlist ',
    href: '#watchlist',
    predicate: (film) => {
      return film.userDetails.watchlist;
    },
  },
  {
    name: 'History ',
    href: '#history',
    predicate: (film) => {
      return film.userDetails.alreadyWatched;
    },
  },
  {
    name: 'Favorites ',
    href: '#favorites',
    predicate: (film) => {
      return film.userDetails.favorite;
    },
  },
];

