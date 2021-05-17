import Observer from '../utils/observer.js';

export default class MoviesModel extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  //запись данных в модель
  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  //получение данных из модели
  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  reRender(updateType, update) {
    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        name: movie.film_info.title,
        originName: movie.film_info.alternative_title,
        director: movie.film_info.director,
        screenwriters: movie.film_info.writers,
        actors: movie.film_info.actors,
        data: new Date(movie.film_info.release.date),
        country: movie.film_info.release.release_country,
        ageRating: movie.film_info.age_rating,
        poster: movie.film_info.poster,
        description: movie.film_info.description,
        filmGenre: movie.film_info.genre,
        duration: movie.film_info.runtime,
        rating: movie.film_info.total_rating,
        userDetails: {
          watchlist: movie.user_details.watchlist,
          alreadyWatched: movie.user_details.already_watched,
          favorite: movie.user_details.favorite,
          watchingDate: movie.user_details.watching_date,
        },
      },
    );

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  }

  static adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        text: comment.comment,
      },
    );

    delete adaptedComment.comment;

    return adaptedComment;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        'film_info': {
          'title': movie.name,
          'alternative_title': movie.originName,
          'director': movie.director,
          'writers': movie.screenwriters,
          'actors': movie.actors,
          'release': {
            'date': movie.data.toString(),
            'release_country': movie.country,
          },
          'age_rating': movie.ageRating,
          'poster': movie.poster,
          'description': movie.description,
          'genre': movie.filmGenre,
          'runtime': movie.duration,
          'total_rating': movie.rating,
        },
        'user_details': {
          'watchlist': movie.userDetails.watchlist,
          'already_watched': movie.userDetails.alreadyWatched,
          'favorite': movie.userDetails.favorite,
          'watching_date': movie.userDetails.watchingDate,
        },
      },
    );
    delete adaptedMovie.id;
    delete adaptedMovie.name;
    delete adaptedMovie.originName;
    delete adaptedMovie.director;
    delete adaptedMovie.screenwriters;
    delete adaptedMovie.actors;
    delete adaptedMovie.country;
    delete adaptedMovie.ageRating;
    delete adaptedMovie.poster;
    delete adaptedMovie.description;
    delete adaptedMovie.date;
    delete adaptedMovie.filmGenre;
    delete adaptedMovie.duration;
    delete adaptedMovie.userDetails.watchlist;
    delete adaptedMovie.userDetails.alreadyWatched;
    delete adaptedMovie.userDetails.favorite;

    return adaptedMovie;
  }
}
