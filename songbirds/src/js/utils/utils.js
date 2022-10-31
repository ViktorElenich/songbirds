export const customCreateElement = (tagName, className, id) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (id) element.id = className;
  return element;
}
