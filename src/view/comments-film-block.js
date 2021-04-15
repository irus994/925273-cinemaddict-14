import AbstractView from './abstract';

const creatCommentedFilmBlock = () => {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
`;
};
export default class CommentedFilmBlockView extends AbstractView {
  getTemplate() {
    return creatCommentedFilmBlock();
  }
}
