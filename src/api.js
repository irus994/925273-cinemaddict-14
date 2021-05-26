import MoviesModel from './model/movies-model.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const AUTHORIZATION = 'Basic gno0dtbN9da8cdr7d';
export const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

export class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint; //строка запроса
    this._authorization = authorization; //строка авторизации
  }

  getMovies() {
    return this._load({url: 'movies'})
      .then(Api.toJSON)
      .then((movies) => {
        return movies.map(MoviesModel.adaptToClient);
      });
  }

  getComments(movie) {
    return this._load({url: `comments/${movie.id}`})
      .then(Api.toJSON)
      .then((comments) => {
        return comments.map(MoviesModel.adaptCommentToClient);
      });
  }

  addComment(comment, movieId)  {
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(MoviesModel.adaptCommentToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then((response) => {
        return {
          comments: response.comments.map(MoviesModel.adaptCommentToClient),
          movie: MoviesModel.adaptToClient(response.movie),
        };
      });
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    });
  }

  updateMovie(movie) {
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
