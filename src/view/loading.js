import AbstractView from './abstract';

const createNoMoviesTemplate = () => {
  return '<h2 class="films-list__title">Loading...</h2>';
};

export default class LoadingView extends AbstractView {
  getTemplate() {
    return createNoMoviesTemplate();
  }
}
