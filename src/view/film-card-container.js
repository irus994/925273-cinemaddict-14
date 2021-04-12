import {createElement} from './utils.js';

const createFilmCardContainer = () => {
  return `

      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
      </section>
    `;
};

export default class FilmCardContainerView {
  constructor() {
    this._element = null; //что именно тут хранится? какая практическая значимость? почему указан null
  }

  getTemplate() {
    return createFilmCardContainer();
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
