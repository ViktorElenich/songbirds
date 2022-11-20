import { Page } from "../../js/templates/pages";
import { customCreateElement } from "../../js/utils/utils";

export class MainPage extends Page {
  constructor(id) {
    super(id);
    this.lang = localStorage.getItem('lang') || 'en';
  }

  renderWrapper(lang) {
    const switchLang = document.querySelector('.header-container__switch-lang');
    switchLang.style.pointerEvents = 'auto';
    const mainPage = customCreateElement('div', 'main-page');
    const homeLink = document.querySelector('.link__home');
    const gameLink = document.querySelector('.link__game');
    const scoreLink = document.querySelector('.link__score');
    const galleryLink = document.querySelector('.link__gallery');
    gameLink.classList.remove('active');
    scoreLink.classList.remove('active');
    galleryLink.classList.remove('active');
    homeLink.classList.add('active');
    mainPage.innerHTML = `
      <div class="container">
        <div class="logo__container">
          <h1 class="logo"></h1>
        </div>
        <a href="#game-page" class="btn-start">${lang === 'en' ? 'Start' : 'Старт'}</a>
        <div class="bird-container bird-container--one">
          <div class="bird bird--one"></div>
        </div>
        <div class="bird-container bird-container--two">
          <div class="bird bird--two"></div>
        </div>
        <div class="bird-container bird-container--three">
          <div class="bird bird--three"></div>
        </div>
        <div class="bird-container bird-container--four">
          <div class="bird bird--four"></div>
        </div>
      </div>
    `;
    this.scoreCont = document.querySelector('.header-container__score');
    this.scoreCont.innerHTML = `${lang === 'en' ? 'Score' : 'Счет'}: 0`;
    this.container.append(mainPage);
  }

  render() {
    this.renderWrapper(this.lang);
    const input = document.querySelector('.like-switch');
    input.addEventListener('click', (event) => {
      if (event.target.checked === false) {
        this.container.innerHTML = '';
        this.renderWrapper('ru')
      } else {
        this.container.innerHTML = '';
        this.renderWrapper('en')
      }
    })
    return this.container;
  }
}
