import { Page } from "../../js/templates/pages";
import { customCreateElement } from "../../js/utils/utils";
import {GameNavigation} from "../../helpers";

export class GamePage extends Page {
  constructor(id) {
    super(id);
  }

  renderWrapper() {
    const gamePage = customCreateElement('div', 'game-page');
    const homeLink = document.querySelector('.link__home');
    const gameLink = document.querySelector('.link__game');
    const scoreLink = document.querySelector('.link__score');
    homeLink.classList.remove('active');
    scoreLink.classList.remove('active');
    gameLink.classList.add('active');

    const gameContainer = customCreateElement('div', 'game-page__container');
    const gameContainerNav = customCreateElement('div', 'game-page__container-navigation');
    const ul = customCreateElement('ul', 'navigation');
    GameNavigation.forEach(nav => {
      const li = customCreateElement('li', 'navigation-item');
      li.textContent = nav.category;
      ul.append(li);
      gameContainerNav.append(ul);
    });

    const gameContainerQuestion = customCreateElement('div', 'game-page__container-question');
    const questionImg = customCreateElement('img', 'bird-image');
    questionImg.src = './assets/birdBlock.jpg';
    questionImg.alt = 'bird';
    const questionBlock = customCreateElement('div', 'question-container');
    const questionBlockUl = customCreateElement('ul', 'question-container__block');
    const questionText = customCreateElement('li', 'block-item');
    questionText.textContent = '********';
    const questionAudioContainer = customCreateElement('li', 'block-item');
    const audioPlayer = customCreateElement('div', 'audio-player');
    audioPlayer.innerHTML = `
      <div class="player-slider__container">
      <div class="playpause-track">
        <i class="fa fa-play-circle fa-5x"></i>
      </div>
        <div class="current-time">00:00</div>
        <input type="range" min="1" max="100" value="0" class="seek_slider">
        <div class="total-duration">00:00</div>
      </div>
      <div class="player-slider__container">
        <i class="fa fa-volume-down"></i>
        <input type="range" min="0" max="100" value="99" class="volume_slider">
        <i class="fa fa-volume-up"></i>
      </div>
    `;
    questionAudioContainer.append(audioPlayer);

    questionBlockUl.append(questionText, questionAudioContainer);
    questionBlock.append(questionBlockUl);
    gameContainerQuestion.append(questionImg, questionBlock);

    gameContainer.append(gameContainerNav, gameContainerQuestion);
    gamePage.append(gameContainer);
    this.container.append(gamePage);
  }

  render() {
    this.renderWrapper();
    return this.container;
  }
}
