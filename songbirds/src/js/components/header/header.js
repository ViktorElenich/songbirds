import { Components } from "../../templates/components";
import { customCreateElement, setToLocalStorage } from "../../utils/utils";
import { Navigation } from "../../../helpers";

export class Header extends Components {

  constructor(tagName, className, id) {
    super(tagName, className, id);
    this.lang = localStorage.getItem('lang') || 'en';
  }

  createHeaderElements() {
    const headerContainer = customCreateElement('div', 'header-container');
    const headerNav = customCreateElement('nav', 'header-container__navigation-container');
    const score = customCreateElement('div', 'header-container__score');
    score.innerHTML = 'Score: 0';
    const switchLang = customCreateElement('label', 'header-container__switch-lang');
    const input = customCreateElement('input', 'like-switch');
    input.type = 'checkbox';
    input.checked = !localStorage.getItem('input') ? true : localStorage.getItem('input') === 'true' ? true : false;
    const switchCover = customCreateElement('div', 'switch-cover');
    const spanRu = customCreateElement('span', 'switch-lang switch-lang--ru', '', 'ru');
    const spanEn = customCreateElement('span', 'switch-lang switch-lang--en', '', 'en');
    const switchCircle = customCreateElement('div', 'switch-circle');
    switchCover.append(spanRu, spanEn, switchCircle);
    switchLang.append(input, switchCover);

    headerNav.append(this.renderNav(this.lang))
    headerContainer.append(headerNav, score, switchLang);
    this.container.append(headerContainer);

    input.addEventListener('click', (event) => {
      if (event.target.checked === false) {
        setToLocalStorage('lang', 'ru');
        setToLocalStorage('input', 'false');
        this.lang = 'ru';
        headerNav.innerHTML = '';
        headerNav.append(this.renderNav(this.lang));
        score.innerHTML = 'Счет: 0';
      } else {
        setToLocalStorage('lang', 'en');
        setToLocalStorage('input', 'true');
        this.lang = 'en';
        headerNav.innerHTML = '';
        headerNav.append(this.renderNav(this.lang));
        score.innerHTML = 'Score: 0';
      }
    })
  }

  renderNav(lang) {
    const headerNavUl = customCreateElement('ul', 'navigation-container__links');
    Navigation.forEach(link => {
      const li = customCreateElement('li', 'links__item');
      const a = customCreateElement('a', `${link.className}`);
      a.href = `#${link.id}`;
      a.innerHTML = link.text[lang];
      li.append(a);
      headerNavUl.append(li);
    })
    return headerNavUl;
  }

  render() {
    this.createHeaderElements();
    return this.container;
  }
}
