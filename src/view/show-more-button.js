import AbstractView from './abstract';

export const createShowMoreButton = () => {
  return `
        <button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButtonView extends AbstractView {
  getTemplate() {
    return createShowMoreButton();
  }
}
