
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const getDurationParts = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return [hours, minutes];
};

export const  getTimeFromMinutes = (mins) => {
  const [hours, minutes] = getDurationParts(mins);
  return hours + 'h ' + minutes + 'm';
};

