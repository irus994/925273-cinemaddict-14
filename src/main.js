
import SiteMenuView from './view/site-menu.js';
import FilmCardView from './view/film-card.js';
import FilmCardContainerView from './view/film-card-container.js';
import FilmContentView from './view/main-content.js';
import UserRankView from './view/user-rank.js';
import sortListView from './view/sort-list.js';
import ShowMoreButtonView from './view/show-more-button.js';
import CommentedFilmBlockView from './view/comments-film-block.js';
import TopFilmBlockView from './view/top-film-block.js';
import PopupFilmView from './view/popup.js';
import {generateFilmData, generateCommentData} from './mock/film-data.js';
import FilmCommentsBlockView from './view/film-comment-block.js';
import FilmCommentView from './view/film-comments.js';
import {filters} from './mock/filter-data.js';
import {renderElement, RenderPosition} from './view/utils.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteBodyElement = document.querySelector('body');

const FILMS_COUNT = 26;
const FILMS_COUNT_START = 5;
const COMMENTS_COUNT = 4;
let renderedFilmCount = FILMS_COUNT_START;

//генерция попапа
const createPopupBlock = (film) => {
  const COMMENTS_COUNT = 4;
  const popupFilm = new PopupFilmView(film);
  const popupBlock = popupFilm.getElement().querySelector('.film-details__bottom-container');
  const filmCommentsBlock = new FilmCommentsBlockView();
  renderElement(popupBlock, filmCommentsBlock.getElement(), RenderPosition.BEFOREEND);
  const filmCommentsList = filmCommentsBlock.getElement().querySelector('.film-details__comments-list');

  for (let i = 0; i < COMMENTS_COUNT; i++) {
    renderElement(filmCommentsList, new FilmCommentView(comments[i]).getElement(), RenderPosition.BEFOREEND);
  }
  return popupFilm;
};

//отрисовка карточки
const renderFilmCard = (container, film, position) => {
  const filmCard = new FilmCardView(film);
  renderElement(container, filmCard.getElement(), position);

  const filmPopup = createPopupBlock(film);

  //открытие попапа
  const openPopup = () => {
    siteBodyElement.appendChild(filmPopup.getElement());
    siteBodyElement.classList.add('hide-overflow');
  };

  filmCard.getElement().querySelector('.film-card__poster').addEventListener('click', openPopup);
  filmCard.getElement().querySelector('.film-card__title').addEventListener('click', openPopup);
  filmCard.getElement().querySelector('.film-card__comments').addEventListener('click', openPopup);

  //закрытие попапа
  const closePopup = () => {
    siteBodyElement.removeChild(filmPopup.getElement());
    siteBodyElement.classList.remove('hide-overflow');
  };

  const popupCloseButton = filmPopup.getElement().querySelector('.film-details__close-btn');
  popupCloseButton.addEventListener('click', closePopup);
};

const films = new Array(FILMS_COUNT).fill().map(generateFilmData);
const comments = new Array(COMMENTS_COUNT).fill().map(generateCommentData);

const maimFilmContent = new FilmContentView();
renderElement(siteMainElement, maimFilmContent.getElement(), RenderPosition.AFTERBEGIN);
const mainFilmContent = siteMainElement.querySelector('.films');

renderElement(siteMainElement, new sortListView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteMenuView(filters, films).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteHeaderElement, new UserRankView().getElement(), RenderPosition.BEFOREEND);

// отрисовка основного блока с карточками фильмов
const filmCardContainerComponent = new FilmCardContainerView();
renderElement(maimFilmContent.getElement(), filmCardContainerComponent.getElement(), RenderPosition.BEFOREEND);
const filmCardContainer = filmCardContainerComponent.getElement().querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT_START; i++) {
  renderFilmCard(filmCardContainer, films[i], RenderPosition.BEFOREEND);
}

// отрисовка блока Top rated
{
  const CARD_COUNT = 2;
  renderElement(mainFilmContent, new TopFilmBlockView().getElement(), RenderPosition.BEFOREEND);
  const topFilmBlock = document.querySelector('.films-list--extra');
  const filmTopCardContainer = topFilmBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    renderFilmCard(filmTopCardContainer, films[i], RenderPosition.BEFOREEND);
  }
}

//отрисовка блока Most commented
{
  const CARD_COUNT = 2;
  renderElement(mainFilmContent, new CommentedFilmBlockView().getElement(), RenderPosition.BEFOREEND);
  const commentFilmBlock = document.querySelector('.films-list--extra:last-child');
  const filmCommentCardContainer = commentFilmBlock.querySelector('.films-list__container');
  for (let i = 0; i < CARD_COUNT; i++) {
    renderFilmCard(filmCommentCardContainer, films[i], RenderPosition.BEFOREEND);
  }
}


// Загрузка фильмов по нажатию кнопки
if (FILMS_COUNT > FILMS_COUNT_START) {
  const filmList = siteMainElement.querySelector('.films-list');
  renderElement(filmList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_START)
      .forEach((film) => renderFilmCard(filmCardContainer, film, RenderPosition.BEFOREEND));

    renderedFilmCount = renderedFilmCount + FILMS_COUNT_START;

    if (renderedFilmCount >= films.length ) {
      loadMoreButton.remove();
    }
  });
}

