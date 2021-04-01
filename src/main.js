
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilmCard, createFilmCardContainer} from './view/film-card.js';
// import {createUserRank} from './view/user-rank.js'; временно отключен
import {createSortList} from './view/sort-list.js';
import {createShowMoreButton} from './view/show-more-button.js';
import {createTopFilmBlock, creatCommentedFilmBlock} from './view/top-film-block.js';
import {createFilmContent} from './view/main-content.js';
import {createPopupFilm} from './view/popup.js';

const siteMainElement = document.querySelector('.main');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createFilmContent(), 'afterbegin');
const mainFilmContent = siteMainElement.querySelector('.films');

render(siteMainElement, createSortList(), 'afterbegin');
render(siteMainElement, createSiteMenuTemplate(), 'afterbegin');


const renderFilmBlock = () => {
  const CARD_COUNT = 5;
  render(mainFilmContent, createFilmCardContainer(), 'beforeend');
  const filmCardContainer = siteMainElement.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmCardContainer, createFilmCard(), 'beforeend');
  }
};
renderFilmBlock();

const renderTopFilmBlock = () => {
  const CARD_COUNT = 2;
  render(mainFilmContent, createTopFilmBlock(), 'beforeend');
  const topFilmBlock = document.querySelector('.films-list--extra');
  const filmTopCardContainer = topFilmBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmTopCardContainer, createFilmCard(), 'beforeend');
  }
};
renderTopFilmBlock();

const renderCommentedFilmBlock = () => {
  const CARD_COUNT = 2;
  render(mainFilmContent, creatCommentedFilmBlock(), 'beforeend');
  const commentFilmBlock = document.querySelector('.films-list--extra:last-child');
  const filmCommentCardContainer = commentFilmBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmCommentCardContainer, createFilmCard(), 'beforeend');
  }
};
renderCommentedFilmBlock();

// render(siteMainElement, createUserRank(), 'beforebegin'); временно отключить
const renderShowMoreButton = () => {
  const filmList = document.querySelector('.films-list');
  render(filmList, createShowMoreButton(), 'beforeend');
};

renderShowMoreButton();

render(siteMainElement, createPopupFilm(), 'aftereend');
