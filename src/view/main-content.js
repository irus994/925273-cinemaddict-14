import {createElement} from './utils.js';

const createFilmContent = () => {
  return `<section class="films">
</section>`;
};

export default class FilmContentView {
  constructor () {
    this._element = null;
  }

  getTemplate() {
    return createFilmContent();
  }

  getElement() {
    if (!this._element){
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

