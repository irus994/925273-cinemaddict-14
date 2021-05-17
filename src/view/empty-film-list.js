import AbstractView from './abstract.js';

const EmptyFilmListTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class EmptyFilmListView extends AbstractView {
  getTemplate() {
    return EmptyFilmListTemplate();
  }
}
