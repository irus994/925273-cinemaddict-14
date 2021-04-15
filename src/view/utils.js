
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const MONTHS_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const  getTimeFromMinutes = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return hours + 'h ' + minutes + 'm';
};

export const generateFilmDateRelease = (randomDate) => {
  const filmDateRelease = randomDate.getDate() + ' ' + MONTHS_LIST[randomDate.getMonth()] + ' ' + randomDate.getFullYear();
  return filmDateRelease;
};

