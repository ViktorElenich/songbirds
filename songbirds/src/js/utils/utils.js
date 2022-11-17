import birdsData from "../../data/data";

export const customCreateElement = (tagName, className, id) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (id) element.id = className;
  return element;
}

export const setToLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
}

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getRandomNum = (level) => {
  return Math.floor(Math.random() * (birdsData[level].length - 0) + 0);
}
