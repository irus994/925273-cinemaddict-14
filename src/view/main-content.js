import AbstractView from './abstract';

const createFilmContent = () => {
  return `<section class="films">
</section>`;
};

export default class FilmContentView extends AbstractView {
  getTemplate() {
    return createFilmContent();
  }
}

