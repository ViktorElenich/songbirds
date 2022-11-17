import { Page } from "../../js/templates/pages";
import {customCreateElement, getRandomNum, shuffle} from "../../js/utils/utils";
import { GameNavigation } from "../../helpers";
import { ANSWERS_COUNT } from "../../helpers/const";
import birdsData from "../../data/data";

export class GamePage extends Page {
  constructor(id) {
    super(id);
    this.langValue = 'en';
    this.questions = [];
    this.correctAnswers = [];
    this.currentQuestion = 0;
    this.rightAnswer = '';
    this.level = 0;
    this.score = 0;
    this.count = 5;
    this.isCorrect = false;
    this.audio = new Audio();
    this.song = new Audio;
    this.currentClick = null;
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
    GameNavigation.forEach((nav, idx) => {
      const li = customCreateElement('li', `${idx === this.level ? 'navigation-item active' : 'navigation-item'}`);
      li.textContent = nav.category;
      li.id = idx;
      ul.append(li);
      li.id === this.level ? li.className = 'navigation-item' : 'navigation-item level';
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

  choiceAnswer(event) {
    const allAnswer = document.querySelectorAll('.answer-btn');
    for (let i = 0; i < allAnswer.length; i++) {
      if (allAnswer[i] === event.target) this.currentClick = i;
    }
    console.log(this.currentClick)
  }

  generateAnswers() {
    const answers = [];
    this.currentQuestion = getRandomNum(this.level);

    const rightAnswer = birdsData[this.level][this.currentQuestion].name;
    this.audio.src = birdsData[this.level][this.currentQuestion].audio;

    this.audioPlayer(this.mainPlayer, birdsData[this.level][this.currentQuestion].audio, this.audio);
    this.rightAnswer = rightAnswer;
    answers.push(rightAnswer);

    while (answers.length < ANSWERS_COUNT) {
      const randomAnswer = birdsData[this.level][Math.floor(Math.random() * birdsData[this.level].length)];

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

  findElements() {
    this.birdImage = document.querySelector('.bird-image');
    this.birdText = document.querySelectorAll('.block-item')[0];
    this.answersEl = document.querySelectorAll('.answer');
    this.answerContainer = document.querySelector('.answer-container');
    this.mainPlayer = document.querySelector('.audio-player');
  }

  listeners() {
    const quizAnswerContainer = document.querySelector('#quizAnswers');
    quizAnswerContainer.addEventListener('click', (event) => {
      const { target } = event;
      const isAnswer = target.classList.contains('answer');

      if (isAnswer) {
        this.answer(target);
      }
    })

    this.answerContainer.addEventListener('click', (event) => {
      this.choiceAnswer(event);
    });

  }

  async answer(answer) {
    let answerText;
    const scoreCont = document.querySelector('.header-container__score');

    answerText = answer === 'timeout' ? 'timeout' : answer.innerHTML;
    if (answerText === this.rightAnswer) {
      this.isCorrect = true;
      this.correctAnswers.push(this.questions[this.currentQuestion]);
      answer.classList.add('correct');
      this.song.src = `./assets/ok.mp3`;
      await this.song.play();
      this.audio.pause();
      this.score += this.count;
      this.birdImage.src = birdsData[this.level][this.currentQuestion].image;
      this.birdText.textContent = birdsData[this.level][this.currentQuestion].name;
    } else if (answerText === 'timeout') {
      this.isCorrect = false;
    } else {
      this.isCorrect = false;
      answer.classList.add('incorrect');
      this.count--;
      this.song.src = `./assets/fail.mp3`;
      await this.song.play();
    }
    scoreCont.innerHTML = `Score: ${this.score}`;
  }

  audioPlayer(block, song, audio) {
    const playBtn = block.querySelector('.playpause-track');
    const seekSlider = block.querySelector('.seek_slider');
    const volumeSlider = block.querySelector('.volume_slider');
    const currentTime = block.querySelector('.current-time');
    const totalDuration = block.querySelector('.total-duration');
    let isPlay = false;
    let updateTimer;

    function playTrack() {
      audio.src = song;
      audio.play();
      isPlay = true;
      playBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }

    function pauseTrack() {
      audio.pause();
      isPlay = false;
      playBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }

    function playPauseTrack(){
      return isPlay ? pauseTrack() : playTrack();
    }

    function seekTo() {
      const seek = audio.duration * (seekSlider.value / 100);
      audio.currentTime = seek;
    }

    function setVolume() {
      audio.volume = volumeSlider.value / 100;
    }

    function setUpdate() {
      let seekPosition = 0;
      if (!Number.isNaN(audio.duration)) {
        seekPosition = audio.currentTime * (100 / audio.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

        if (currentSeconds < 10) {currentSeconds = `0${currentSeconds}`;}
        if (durationSeconds < 10) {durationSeconds = `0${durationSeconds}`;}
        if (currentMinutes < 10) {currentMinutes = `0${currentMinutes}`;}
        if (durationMinutes < 10) {durationMinutes = `0${durationMinutes}`;}

        currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
        totalDuration.textContent = `${durationMinutes}:${durationSeconds}`;
      }
    }

    function loadTrack() {
      clearInterval(updateTimer);
      updateTimer = setInterval(setUpdate, 1000);
    }
    loadTrack();

    seekSlider.addEventListener('change', seekTo);
    volumeSlider.addEventListener('change', setVolume);

    playBtn.addEventListener('click', () => {
      playPauseTrack()
    });
  }

  render() {
    this.renderWrapper();
    return this.container;
  }

  async afterRender() {
    this.findElements();
    this.generateAnswers();
    this.listeners();
  }
}
