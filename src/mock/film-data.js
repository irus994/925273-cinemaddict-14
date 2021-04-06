const createRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const posterImages = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const fragmentsDescriptions = [
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

const filmsNames = [
  'Film 1',
  'Film 2',
  'Film 3',
];

const filmsYears = [
  '2003',
  '2013',
  '2020',
  '1995',
];

const filmGenres = [
  'Comedy',
  'Drama',
  'Horror',
];

const commentsEmotions = [
  './images/emoji/smile.png',
  './images/emoji/sleeping.png',
  './images/emoji/puke.png',
  './images/emoji/angry.png',
];

const actors = [
  ' Хороший Актер',
  ' Актер Неочень',
  ' Средний актер',
];

const createFilmDescription = () => {
  const filmDescription = [];
  const MAX_COUTN = 5;
  for (let i = 0; i <= createRandomNumber(0, MAX_COUTN); i++) {
    const fragmentDescription = fragmentsDescriptions[createRandomNumber(0, fragmentsDescriptions.length - 1)];
    filmDescription.push(fragmentDescription);
  }
  return filmDescription;
};
createFilmDescription();


export const generateFilmData = () => {
  return {
    name: filmsNames[createRandomNumber(0, filmsNames.length - 1)],
    originName: 'Origin: ' + filmsNames[createRandomNumber(0, filmsNames.length - 1)],
    director: 'Director Director',
    screenwriters: 'Screenwriters',
    actors: actors,
    data: '01 April 1995',
    country: 'USA',
    ageRating: createRandomNumber(0 ,18) + '+',
    poster: './images/posters/' + posterImages[createRandomNumber(0, posterImages.length - 1)],
    description: createFilmDescription(),
    productionYear: filmsYears[createRandomNumber(0, filmsYears.length - 1)],
    filmGenre: filmGenres,
    duration: '1h 36m',
    rating: createRandomNumber(1,5) + '.' + createRandomNumber(0,9),
    comments: [1, 2, 3],
  };
};
generateFilmData();

export const generateCommentData = () => {
  return  {
    id: createRandomNumber(1, 3),
    text: 'Среднее кино',
    author: 'Иван',
    emotion: commentsEmotions[createRandomNumber(0, commentsEmotions.length - 1)],
    date: '2019/12/31 23:59',
  };
};

