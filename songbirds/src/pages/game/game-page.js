import { Page } from "../../js/templates/pages";
import {customCreateElement, shuffle} from "../../js/utils/utils";
import { GameNavigation } from "../../helpers";
import {ANSWERS_COUNT} from "../../helpers/const";

export class GamePage extends Page {
  constructor(id) {
    super(id);
    this.allQuestions = [];
    this.questions = [];
    this.correctAnswers = [];
    this.currentQuestion = 0;
    this.rightAnswer = '';
    this.isCorrect = false;
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

    const gameAnswerContainer = customCreateElement('div', 'game-page__container-answer');
    const answerBlock = customCreateElement('div', 'answer-container');
    const answerInfo = customCreateElement('div', 'answer-info');

    answerBlock.innerHTML = `
      <div class="quiz__answers " id="quizAnswers">
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
        <button class="answer-btn answer"></button>
      </div>
    `

    gameAnswerContainer.append(answerBlock, answerInfo)

    gameContainer.append(gameContainerNav, gameContainerQuestion, gameAnswerContainer);
    gamePage.append(gameContainer);
    this.container.append(gamePage);
  }

  generateAnswers() {
    const answers = [];

    const rightAnswer = this.questions[this.currentQuestion].name;
    this.rightAnswer = rightAnswer;
    answers.push(rightAnswer);

    while (answers.length < ANSWERS_COUNT) {
      const randomAnswer = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)];

      if (!answers.includes(randomAnswer.name)) {
        answers.push(randomAnswer.name);
      }
    }
    shuffle(answers);
    this.answersEl.forEach((el, idx) => (el.textContent = answers[idx]));

    this.answersEl.forEach((el) => {
      el.classList.remove('correct');
      el.classList.remove('incorrect');
    })
  }

  disableAnswer() {
    this.answersEl.forEach((btn) => (btn.disabled = !btn.disabled));
  }

  findElements() {
    this.answersEl = document.querySelectorAll('.answer');
  }

  render() {
    this.renderWrapper();
    return this.container;
  }
}
