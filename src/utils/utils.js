
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const  getTimeFromMinutes = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return hours + 'h ' + minutes + 'm';
};
