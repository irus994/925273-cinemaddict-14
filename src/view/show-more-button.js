import {createElement} from './utils.js';

export const createShowMoreButton = () => {
  return `
        <button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButtonView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButton();
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
