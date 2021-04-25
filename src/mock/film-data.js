const createRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const POSTER_IMAGES = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const FRAGMENTS_DESCROPTIONS  = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit .',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const FILMS_NAMES = [
  'Film 1',
  'Film 2',
  'Film 3',
];

const FILMS_YEARS = [
  '2003',
  '2013',
  '2020',
  '1995',
];

const FILMS_GENRES = [
  'Comedy',
  'Drama',
  'Horror',
];

const COMMENTS_EMOTIONS = [
  './images/emoji/smile.png',
  './images/emoji/sleeping.png',
  './images/emoji/puke.png',
  './images/emoji/angry.png',
];

const ACTORS = [
  ' Хороший Актер',
  ' Актер Неочень',
  ' Средний актер',
];

const createFilmDescription = () => {
  const filmDescription = [];
  const MAX_COUNT = 5;
  for (let i = 0; i <= createRandomNumber(0, MAX_COUNT); i++) {
    const fragmentDescription = FRAGMENTS_DESCROPTIONS[createRandomNumber(0, FRAGMENTS_DESCROPTIONS.length - 1)];
    filmDescription.push(fragmentDescription);
  }
  return filmDescription.join(' ');
};

const GET_RANDOM_DATE = new Date(createRandomNumber(1995, 2020), createRandomNumber(1, 12), createRandomNumber(1, 31));

let nextId = 0;

export const generateFilmData = () => {
  nextId = nextId + 1;
  return {
    id: nextId,
    name: FILMS_NAMES[createRandomNumber(0, FILMS_NAMES.length - 1)],
    originName: 'Origin: ' + FILMS_NAMES[createRandomNumber(0, FILMS_NAMES.length - 1)],
    director: 'Director Director',
    screenwriters: 'Screenwriters',
    actors: ACTORS,
    data: GET_RANDOM_DATE,
    country: 'USA',
    ageRating: createRandomNumber(0 ,18) + '+',
    poster: './images/posters/' + POSTER_IMAGES[createRandomNumber(0, POSTER_IMAGES.length - 1)],
    description: createFilmDescription(),
    productionYear: FILMS_YEARS[createRandomNumber(0, FILMS_YEARS.length - 1)],
    filmGenre: FILMS_GENRES.slice(0, createRandomNumber(1, FILMS_GENRES.length)),
    duration: createRandomNumber(90, 140),
    rating: createRandomNumber(1,5) + '.' + createRandomNumber(0,9),
    comments: [1, 2, 3],
    userDetails: {
      watchlist: createRandomNumber(0, 1),
      alreadyWatched: createRandomNumber(0, 1),
      favorite: createRandomNumber(0, 1),
      allMovies: createRandomNumber(0, 1),
    },
  };
};

export const generateCommentData = () => {
  return  {
    id: createRandomNumber(1, 3),
    text: 'Среднее кино',
    author: 'Иван',
    emotion: COMMENTS_EMOTIONS[createRandomNumber(0, COMMENTS_EMOTIONS.length - 1)],
    date: '2019/12/31 23:59',
  };
};

