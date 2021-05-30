import AbstractView from './abstract';

const createFooterFilmsCountTemplate = (totalFilmsCount) => {
  return `<p>${totalFilmsCount} movies inside</p>`;
};

export default class FooterFilmsCountView extends AbstractView {
  constructor(totalFilmsCount) {
    super();
    this._totalFilmsCount = totalFilmsCount;
  }

  getTemplate() {
    return createFooterFilmsCountTemplate(this._totalFilmsCount);
  }
}

