
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilmCard, createFilmCardContainer} from './view/film-card.js';
import {createUserRank} from './view/user-rank.js';
import {createShowMoreButton} from './view/show-more-button.js';
import {createPopupInfo} from './view/popup-full-info.js';

const siteMainElement = document.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


render(siteMainElement, createSiteMenuTemplate(), 'afterbegin');

const renderFilmBlock = () => {
  const CARD_COUNT = 5;
  render(siteMainElement, createFilmCardContainer(), 'beforeend');
  const filmCardContainer = siteMainElement.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmCardContainer, createFilmCard(), 'beforeend');
  };
};
renderFilmBlock();

render(siteMainElement, createUserRank(), 'beforebegin');


render(siteMainElement, createShowMoreButton(), 'afterend');

// render(siteMainElement, createPopupInfo(), 'afterend');
