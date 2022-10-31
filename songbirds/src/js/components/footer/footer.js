import { Components } from "../../templates/components";
import {customCreateElement} from "../../utils/utils";

const links = [
  {
    className: 'footer-container__author',
    href: 'https://github.com/ViktorElenich',
    target: '_blank',
    text: '© 2021 Viktor Elenich'
  },
  {
    className: 'footer-container__logo-rss',
    href: 'https://rs.school/js/',
    target: '_blank',
    text: ''
  }
]

export class Footer extends Components {

  constructor(tagName, className, id) {
    super(tagName, className, id)
  }

  createFooterElements() {
    const footerContainer = customCreateElement('div', 'footer-container');
    links.forEach((el) => {
      const link = customCreateElement('a', `${el.className}`);
      link.innerHTML = `${el.text}`;
      link.href = `${el.href}`;
      link.target = `${el.target}`;
      footerContainer.append(link);
    });
    this.container.append(footerContainer);
  }

  render() {
    this.createFooterElements();
    return this.container;
  }
}
