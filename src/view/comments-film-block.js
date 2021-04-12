import {createElement} from './utils';

const creatCommentedFilmBlock = () => {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
`;
};
export default class CommentedFilmBlockView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return creatCommentedFilmBlock();
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
