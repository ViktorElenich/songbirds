import { Components } from "../../templates/components";
import { customCreateElement } from "../../utils/utils";
import { Navigation } from "../../../helpers";

export class Header extends Components {

  constructor(tagName, className, id) {
    super(tagName, className, id)
  }

  createHeaderElements() {
    const headerContainer = customCreateElement('div', 'header-container');

    const headerNav = customCreateElement('nav', 'header-container__navigation-container');
    const headerNavUl = customCreateElement('ul', 'navigation-container__links');
    Navigation.forEach(link => {
      const li = customCreateElement('li', 'links__item');
      const a = customCreateElement('a', `${link.className}`);
      a.href = `#${link.id}`;
      a.innerHTML = link.text;
      li.append(a);
      headerNavUl.append(li);
    })
    headerNav.append(headerNavUl);

    const score = customCreateElement('div', 'header-container__score');
    score.innerHTML = 'Score: 0';

    headerContainer.append(headerNav, score);
    this.container.append(headerContainer);
  }

  render() {
    this.createHeaderElements();
    return this.container;
  }
}
