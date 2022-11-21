import { Page } from "../../js/templates/pages";
import { customCreateElement } from "../../js/utils/utils";
import { birdsDataEn, birdsData } from "../../data/data";

export class GalleryPage extends Page {
  constructor(id) {
    super(id);
    this.lang = localStorage.getItem('lang') || 'en';
  }
  renderWrapper(lang) {
    const homeLink = document.querySelector('.link__home');
    const gameLink = document.querySelector('.link__game');
    const scoreLink = document.querySelector('.link__score');
    const galleryLink = document.querySelector('.link__gallery');
    homeLink.classList.remove('active');
    gameLink.classList.remove('active');
    scoreLink.classList.remove('active');
    galleryLink.classList.add('active');

    this.scoreCont = document.querySelector('.header-container__score');
    this.scoreCont.innerHTML = `${lang === 'en' || !lang ? 'Score' : 'Счет'}: 0`;
    const galleryPage = customCreateElement('div', 'gallery-page');
    const galleryContainer = customCreateElement('div', 'gallery-page__container');
    const langData = lang === 'en' || !lang ? birdsDataEn : birdsData;
    langData.flat().forEach((item) => {
      const galleryItems = customCreateElement('div', 'gallery-page__container-items');
      galleryItems.append(this.generateCards(item));
      galleryContainer.append(galleryItems);
    })
    galleryPage.append(galleryContainer);
    this.container.append(galleryPage);
  }

  generateCards(bird) {
    const div = customCreateElement('div');
    const itemCont = customCreateElement('div', 'item-info__container');
    const itemImg = customCreateElement('img', 'bird-image');
    itemImg.src = bird.image;
    itemImg.alt = 'bird';
    const infoContBlock = customCreateElement('ul', 'item-info__container-block');
    const name = customCreateElement('li', 'block-item');
    name.textContent = bird.name;
    const species = customCreateElement('li', 'block-item');
    species.textContent = bird.species;
    const audioBlock = customCreateElement('li', 'block-item');
    const audioPlayer = customCreateElement('div', 'audio-player');
    const playCont = customCreateElement('div', 'player-slider__container');
    const playDiv = customCreateElement('div', 'playpause-track');
    const i = customCreateElement('i', 'fa fa-play-circle fa-5x');
    const currentTime = customCreateElement('div', 'current-time');
    currentTime.textContent = '00:00';
    const input = customCreateElement('input', 'seek_slider');
    input.value = 0;
    input.type = 'range';
    input.min = 0;
    input.max = 100;
    const totalDuration = customCreateElement('div', 'total-duration');
    totalDuration.textContent = '00:00';
    const volumeCont = customCreateElement('div', 'player-slider__container');
    const iconMute = customCreateElement('i', 'fa fa-volume-down');
    const inputVolume = customCreateElement('input', 'volume_slider');
    inputVolume.type = 'range';
    inputVolume.value = 100;
    inputVolume.min = 0;
    inputVolume.maxn = 100;
    const iconMaxVolume = customCreateElement('i', 'fa fa-volume-up');
    const p = customCreateElement('p');
    p.textContent = bird.description;
    playDiv.append(i);

    playCont.append(playDiv, currentTime, input, totalDuration);
    volumeCont.append(iconMute, inputVolume, iconMaxVolume);
    audioPlayer.append(playCont, volumeCont);
    audioBlock.append(audioPlayer);
    infoContBlock.append(name, species, audioBlock);
    itemCont.append(itemImg, infoContBlock);
    div.append(itemCont, p);
    const audio = new Audio();
    this.audioPlayer(audioBlock, bird.audio, audio);

    return div;
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
