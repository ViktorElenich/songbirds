import { Components } from "../../templates/components";
import { customCreateElement } from "../../utils/utils";
import { links } from "../../../helpers";



export class Footer extends Components {

  constructor(tagName, className, id) {
    super(tagName, className, id);
    this.lang = localStorage.getItem('lang') || 'en';
  }

  createFooterElements(lang) {
    const footerContainer = customCreateElement('div', 'footer-container');
    links.forEach((el) => {
      const link = customCreateElement('a', `${el.className}`);
      link.innerHTML = `${el.text[lang]}`;
      link.href = `${el.href}`;
      link.target = `${el.target}`;
      footerContainer.append(link);
    });
    this.container.append(footerContainer);
  }

  render() {
    this.createFooterElements(this.lang);
    const input = document.querySelector('.like-switch');
    input.addEventListener('click', (event) => {
      if (event.target.checked === false) {
        this.container.innerHTML = '';
        this.createFooterElements('ru')
      } else {
        this.container.innerHTML = '';
        this.createFooterElements('en')
      }
    })
    return this.container;
  }
}
