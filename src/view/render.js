
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element); //что делает .prepend
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// уже не используется, но я не готова пока ее удалить
// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };
