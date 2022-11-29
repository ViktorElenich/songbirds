import { Page } from "../../js/templates/pages";
import { customCreateElement, getRandomNum, setToLocalStorage, shuffle } from "../../js/utils/utils";
import { GameNavigation } from "../../helpers";
import { ANSWERS_COUNT } from "../../helpers/const";
import { birdsDataEn, birdsData } from "../../data/data";

export class GamePage extends Page {
  constructor(id) {
    super(id);
    this.lang = localStorage.getItem('lang') || 'en';
    this.questions = [];
    this.correctAnswers = [];
    this.currentQuestion = 0;
    this.rightAnswer = '';
    this.level = 0;
    this.score = 0;
    this.count = 5;
    this.isCorrect = false;
    this.audio = new Audio();
    this.audioInfo = new Audio();
    this.song = new Audio();
    this.currentClick = null;
  }

  renderWrapper(lang) {
    const gamePage = customCreateElement('div', 'game-page');
    const homeLink = document.querySelector('.link__home');
    const gameLink = document.querySelector('.link__game');
    const scoreLink = document.querySelector('.link__score');
    const galleryLink = document.querySelector('.link__gallery');
    homeLink.classList.remove('active');
    scoreLink.classList.remove('active');
    galleryLink.classList.remove('active');
    gameLink.classList.add('active');

    this.scoreCont = document.querySelector('.header-container__score');
    this.scoreCont.innerHTML = `${lang === 'en' ? 'Score' : 'Счет'}: 0`;

    const gameContainer = customCreateElement('div', 'game-page__container');
    const gameContainerNav = customCreateElement('div', 'game-page__container-navigation');
    const ul = customCreateElement('ul', 'navigation');
    GameNavigation.forEach((nav, idx) => {
      const li = customCreateElement('li', `${idx === this.level ? 'navigation-item active' : 'navigation-item'}`);
      li.textContent = nav.category[lang];
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
        <div class="input-time">
          <div class="current-time">00:00</div>
          <input type="range" min="1" max="100" value="0" class="seek_slider">
          <div class="total-duration">00:00</div>
        </div>
      </div>
      <div class="player-slider__container">
        <i class="fa fa-volume-down"></i>
        <input type="range" min="0" max="100" value="100" class="volume_slider">
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
    `;

    answerInfo.innerHTML = `
      <p style="text-align: center; font-size: 2vw;">
        ${lang === 'en' ? 'Play song. Choose correct answer' : 'Послушайте плеер. Выберите птицу из списка'}
      </p>
    `;

    gameAnswerContainer.append(answerBlock, answerInfo);
    const nextLevelBtn = customCreateElement('button', 'game-page__container-nextLevel-btn');

    nextLevelBtn.textContent = `${lang === 'en' ? 'Next Level' : 'Следующий уровень'}`;
    gameContainer.append(gameContainerNav, gameContainerQuestion, gameAnswerContainer, nextLevelBtn);
    gamePage.append(gameContainer);
    this.container.append(gamePage);
  }

  choiceAnswer(event) {
    for (let i = 0; i < this.answersEl.length; i++) {
      if (this.answersEl[i].id === event.target.id) this.currentClick = event.target.id;
    }
  }

  generateAnswers(lang) {
    const answer = [];
    this.currentQuestion = getRandomNum(this.level);
    const langData = lang === 'en' || !lang ? birdsDataEn : birdsData;

    const rightAnswer = langData[this.level][this.currentQuestion].name;
    this.audio.src = langData[this.level][this.currentQuestion].audio;
    const id = langData[this.level][this.currentQuestion];
    console.log(rightAnswer)

    this.audioPlayer(this.mainPlayer, langData[this.level][this.currentQuestion].audio, this.audio);
    this.rightAnswer = rightAnswer;
    answer.push(id);

    while (answer.length < ANSWERS_COUNT) {
      const randomAnswer = langData[this.level][Math.floor(Math.random() * langData[this.level].length)];

      if (!answer.includes(randomAnswer)) {
        answer.push(randomAnswer)
      }
    }
    shuffle(answer);
    this.answersEl.forEach((el, idx) => (el.textContent = answer[idx].name));
    this.answersEl.forEach((el, idx) => (el.id = answer[idx].id));

    this.answersEl.forEach((el) => {
      el.classList.remove('correct');
      el.classList.remove('incorrect');
    })
  }

  findElements() {
    this.gamePage = document.querySelector('.game-page__container');
    this.birdImage = document.querySelector('.bird-image');
    this.birdText = document.querySelectorAll('.block-item')[0];
    this.answersEl = document.querySelectorAll('.answer');
    this.answerContainer = document.querySelector('.answer-container');
    this.mainPlayer = document.querySelector('.audio-player');
    this.answerInfo = document.querySelector('.answer-info');
    this.nextLevelBtn = document.querySelector('.game-page__container-nextLevel-btn');
    this.pagination = document.querySelectorAll('.navigation-item');
    this.questionText = document.querySelector('.block-item');
    this.playBtn = document.querySelector('.playpause-track');
    this.scoreCont = document.querySelector('.header-container__score');
  }

  listeners() {
    const quizAnswerContainer = document.querySelector('#quizAnswers');
    quizAnswerContainer.addEventListener('click', (event) => {
      const { target } = event;
      const isAnswer = target.classList.contains('answer');
      if (isAnswer) {
        this.answer(target, this.lang);
      }
      this.answersEl.forEach((el) => {
        if (el.classList.contains('correct')) {
          target.classList.remove('incorrect')
        }
        if (el.classList.contains('correct') || el.classList.contains('incorrect')) {
          const switchLang = document.querySelector('.header-container__switch-lang');
          switchLang.style.pointerEvents = 'none';
        }
      })
    });
    this.answerContainer.addEventListener('click', (event) => {
      this.choiceAnswer(event);
    });
    this.nextLevelBtn.addEventListener('click', () => {
      this.nextLevel(this.lang)
    });
  }

  async answer(answer, lang) {
    let answerText;
    const langData = lang === 'en' || !lang ? birdsDataEn : birdsData;

    answerText = answer === 'timeout' ? 'timeout' : answer.innerHTML;
    if (answerText === this.rightAnswer) {
      this.isCorrect = true;
      this.correctAnswers.push(this.questions[this.currentQuestion]);
      if (answer.classList.contains('correct')){
        this.count = 0;
      }
      answer.classList.add('correct');
      this.song.src = `./assets/ok.mp3`;
      await this.song.play();
      this.audio.pause();
      this.score += this.count;
      this.birdImage.src = langData[this.level][this.currentQuestion].image;
      this.birdText.textContent = langData[this.level][this.currentQuestion].name;
      this.answerInfo.innerHTML = `
        <div class="answer-info__container">
          <img class="bird-image" src="${langData[this.level][this.currentQuestion].image}" alt="bird">
          <ul class="answer-info__container-block">
            <li class="block-item">${langData[this.level][this.currentQuestion].name}</li>
            <li class="block-item">${langData[this.level][this.currentQuestion].species}</li>
            <li class="block-item">
              <div class="audio-player">
                <div class="player-slider__container">
                  <div class="playpause-track">
                    <i class="fa fa-play-circle fa-5x"></i>
                  </div>
                  <div class="input-time">
                    <div class="current-time">00:00</div>
                    <input type="range" min="1" max="100" value="0" class="seek_slider">
                    <div class="total-duration">00:00</div>
                  </div>
                </div>
                <div class="player-slider__container">
                  <i class="fa fa-volume-down"></i>
                  <input type="range" min="0" max="100" value="100" class="volume_slider">
                  <i class="fa fa-volume-up"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p>${langData[this.level][this.currentQuestion].description}</p>
      `;
      this.nextLevelBtn.classList.add('btn-next');
      this.audioPlayer(this.answerInfo, langData[this.level][this.currentQuestion].audio, this.audioInfo);
      this.audioInfo.pause();
      this.audioInfo.currentTime = 0;
    }  else {
      this.isCorrect = false;
      answer.classList.add('incorrect');
      if (answer.classList.contains('incorrect')) {
        this.count--;
      }
      this.song.src = `./assets/fail.mp3`;
      await this.song.play();
      this.audioInfo.pause();
      this.audioInfo.currentTime = 0;
      this.answerInfo.innerHTML = `
        <div class="answer-info__container">
          <img class="bird-image" src="${langData[this.level][this.currentClick - 1].image}" alt="bird">
          <ul class="answer-info__container-block">
            <li class="block-item">${langData[this.level][this.currentClick - 1].name}</li>
            <li class="block-item">${langData[this.level][this.currentClick - 1].species}</li>
            <li class="block-item">
              <div class="audio-player">
                <div class="player-slider__container">
                  <div class="playpause-track">
                    <i class="fa fa-play-circle fa-5x"></i>
                  </div>
                  <div class="input-time">
                    <div class="current-time">00:00</div>
                    <input type="range" min="1" max="100" value="0" class="seek_slider">
                    <div class="total-duration">00:00</div>
                  </div>
                </div>
                <div class="player-slider__container">
                  <i class="fa fa-volume-down"></i>
                  <input type="range" min="0" max="100" value="100" class="volume_slider">
                  <i class="fa fa-volume-up"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p>${langData[this.level][this.currentClick - 1].description}</p>
      `;
      this.audioPlayer(this.answerInfo, langData[this.level][this.currentClick - 1].audio, this.audioInfo);
    }
    this.scoreCont.innerHTML = `${lang === 'en' ? 'Score' : 'Счет'}: ${this.score}`;
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

  nextLevel(lang) {
    if (this.level === 5) {
      if (this.score === 30){
        this.showResult(lang);
      } else {
        this.showModalResult(lang);
      }
    }
    if (this.nextLevelBtn.classList.contains('btn-next')) {
      this.level++;
      this.count = 5;
      this.nextLevelBtn.classList.remove('btn-next');
      this.pagination[this.level - 1].classList.remove('active');
      this.pagination[this.level].classList.add('active');
      this.birdImage.src = './assets/birdBlock.jpg';
      this.questionText.textContent = '********';
      this.answerInfo.innerHTML = `
      <p style="text-align: center; font-size: 2vw;">${lang === 'en' || !lang ? 'Play song. Choose correct answer' : 'Послушайте плеер. Выберите птицу из списка'}</p>
    `;
      this.audioInfo.pause();
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audioInfo.currentTime = 0;
      this.playBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
      this.generateAnswers(lang);
    }
  }

  showResult(lang){
    const resultModal = customCreateElement('div', 'modal__container show-modal');
    resultModal.innerHTML = `
      <div class="modal__content">
      <img class="modal__img" src="./assets/trophy.png" alt="trophy">
        <div class="modal__close close-modal" title="Close">
          <i class="bx bx-x"></i>
        </div>
        <h3 class="modal__title">
          ${lang === 'en' || !lang
            ? `Congratulations! Your score is ${this.score} out of 30`
            : `Поздравляю! Ваш счет ${this.score} из 30`}
        </h3>
        <input type="text" placeholder="${lang === 'en' || !lang ? 'Enter Your Name' : 'Введите имя'}" class="reg" />
        <div class="btn__container">
          <button class="modal__button modal__button-width new">
            ${lang === 'en' || !lang ? 'New Game' : 'Новая игра'}
          </button>
          <a href="#score-page" class="modal__button modal__button-width save">
            ${lang === 'en' || !lang ? 'Save' : 'Сохранить'}
          </a>
        </div>
      </div>
    `
    this.gamePage.append(resultModal)
    this.popup = document.querySelector('.modal__container');
    this.closePopup = document.querySelector('.modal__close');
    this.newGameBtn = document.querySelector('.new');
    this.saveGameBtn = document.querySelector('.save');
    this.closePopup.addEventListener('click', () => {
      this.popup.classList.remove('show-modal');
    });
    this.newGameBtn.addEventListener('click', () => {
      this.level = 0;
      this.score = 0;
      this.scoreCont.innerHTML = `${lang === 'en' || !lang ? 'Score' : 'Счет'}: ${this.score}`;
      this.container.innerHTML = '';
      this.render()
      this.afterRender()
    });
    this.saveGameBtn.addEventListener('click', () => {
      const input = document.querySelector('.reg').value;
      let arr = [];
      if (localStorage.getItem('score')) {
        arr = JSON.parse(localStorage.getItem('score'))
      }
      const res = {
        name: input,
        score: this.score
      };
      arr.push(res);
      arr = arr.slice(0, 10);
      setToLocalStorage('score', JSON.stringify(arr));
    })
  }
  showModalResult(lang) {
    const modal = customCreateElement('div', 'modal__container show-modal');
    modal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close close-modal" title="Close">
          <i class="bx bx-x"></i>
        </div>
        <h3 class="modal__title">
          ${lang === 'en' || !lang ? `Your score is ${this.score} out of 30` : `Ваш счет ${this.score} из 30`}
        </h3>
        <button class="modal__button new">
          ${lang ==='en' || !lang ? 'Try Again' : 'Играть снова'}
        </button>
      </div>
    `;
    this.gamePage.append(modal)
    this.popup = document.querySelector('.modal__container');
    this.closePopup = document.querySelector('.modal__close');
    this.newGameBtn = document.querySelector('.new');
    this.closePopup.addEventListener('click', () => {
      this.popup.classList.remove('show-modal');
    })
    this.newGameBtn.addEventListener('click', () => {
      this.level = 0;
      this.score = 0;
      this.scoreCont.innerHTML = `${lang === 'en' || !lang ? 'Score' : 'Счет'}: ${this.score}`;
      this.container.innerHTML = '';
      this.render()
      this.afterRender()
    })
  }

  render() {
    this.renderWrapper(this.lang);
    const input = document.querySelector('.like-switch');
    input.addEventListener('click', (event) => {
      if (event.target.checked === false) {
        this.container.innerHTML = '';
        this.renderWrapper('ru')
        this.afterRender('ru');
      } else {
        this.container.innerHTML = '';
        this.renderWrapper('en');
        this.afterRender('en');
      }
    })
    return this.container;
  }

  async afterRender(lang) {
    this.findElements();
    this.generateAnswers(`${!lang ? this.lang : lang}`);
    this.listeners();
  }
}
