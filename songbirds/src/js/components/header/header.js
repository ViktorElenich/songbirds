import { Components } from "../../templates/components";
import { customCreateElement } from "../../utils/utils";

export class Header extends Components {

  constructor(tagName, className, id) {
    super(tagName, className, id)
  }

  createHeaderElements() {
    const headerContainer = customCreateElement('div', 'header-container');
    const logoHeader = customCreateElement('div', 'header-container__logo');
    const score = customCreateElement('div', 'header-container__score');
    score.innerHTML = 'Score: 0';
    headerContainer.append(logoHeader, score);
    this.container.append(headerContainer);
  }

  render() {
    this.createHeaderElements();
    return this.container;
  }
}
