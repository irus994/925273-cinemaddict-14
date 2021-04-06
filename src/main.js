
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilmCard, createFilmCardContainer} from './view/film-card.js';
import {createUserRank} from './view/user-rank.js';
import {createSortList} from './view/sort-list.js';
import {createShowMoreButton} from './view/show-more-button.js';
import {createTopFilmBlock, creatCommentedFilmBlock} from './view/top-film-block.js';
import {createFilmContent} from './view/main-content.js';
import {createPopupFilm} from './view/popup.js';  //временно отключен
import {generateFilmData, generateCommentData} from './mock/film-data.js';
import {createFilmCommentsBlock, createFilmComment} from './view/film-comments.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const FILMS_COUNT = 26;
const FILMS_COUNT_START = 5;
const COMMENTS_COUNT = 4;
let renderedFilmCount = FILMS_COUNT_START;

const films = new Array(FILMS_COUNT).fill().map(generateFilmData);
const comments = new Array(COMMENTS_COUNT).fill().map(generateCommentData);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createFilmContent(), 'afterbegin');
const mainFilmContent = siteMainElement.querySelector('.films');

render(siteMainElement, createSortList(), 'afterbegin');
render(siteMainElement, createSiteMenuTemplate(), 'afterbegin');
render(siteHeaderElement, createUserRank(), 'beforeend');

// отрисовка основного блока с карточками фильмов
render(mainFilmContent, createFilmCardContainer(), 'beforeend');
const filmCardContainer = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT_START; i++) {
  render(filmCardContainer, createFilmCard(films[i]), 'beforeend');
}

//отрисовка блока Top rated
const renderTopFilmBlock = () => {
  const CARD_COUNT = 2;
  render(mainFilmContent, createTopFilmBlock(), 'beforeend');
  const topFilmBlock = document.querySelector('.films-list--extra');
  const filmTopCardContainer = topFilmBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmTopCardContainer, createFilmCard(films[i]), 'beforeend');
  }
};
renderTopFilmBlock();

//отрисовка блока Most commented
const renderCommentedFilmBlock = () => {
  const CARD_COUNT = 2;
  render(mainFilmContent, creatCommentedFilmBlock(), 'beforeend');
  const commentFilmBlock = document.querySelector('.films-list--extra:last-child');
  const filmCommentCardContainer = commentFilmBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    render(filmCommentCardContainer, createFilmCard(films[i]), 'beforeend');
  }
};
renderCommentedFilmBlock();


// Загрузка фильмов по нажатию кнопки
if (FILMS_COUNT > FILMS_COUNT_START) {
  const filmList = siteMainElement.querySelector('.films-list');
  render(filmList, createShowMoreButton(), 'beforeend');

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_START)
      .forEach((film) => render(filmCardContainer, createFilmCard(film), 'beforeend'));

    renderedFilmCount = renderedFilmCount + FILMS_COUNT_START;

    if (renderedFilmCount >= films.length ) {
      loadMoreButton.remove();
    }
  });
}

// Отрисовка попапа с полным описпнием фильма
const renderPopupFilm = () => {
  const COMMENTS_COUNT = 4;
  render(siteMainElement, createPopupFilm(films[1]), 'afterend');//временно отключен
  const popupBlock = document.querySelector('.film-details__bottom-container');
  render(popupBlock, createFilmCommentsBlock(), 'beforeend');
  const filmCommentsList = popupBlock.querySelector('.film-details__comments-list');
  for (let i = 0; i <= COMMENTS_COUNT; i++) {
    render(filmCommentsList, createFilmComment(comments[i]), 'afterend');
  }
};
renderPopupFilm();
