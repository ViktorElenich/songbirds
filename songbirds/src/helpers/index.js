export const PageIds = {
  MainPageID: 'main-page',
  GamePageID: 'game-page',
  ScorePageID: 'score-page',
  GalleryPageID: 'gallery-page'
}

export const Navigation = [
  {
    id: PageIds.MainPageID,
    className: 'link__home link',
    text: {
      en: 'Home',
      ru: 'Главная'
    }
  },
  {
    id: PageIds.GamePageID,
    className: 'link__game link',
    text: {
      en: 'Game',
      ru: 'Игра'
    }
  },
  {
    id: PageIds.ScorePageID,
    className: 'link__score link',
    text: {
      en: 'Score',
      ru: 'Счет'
    }
  },
  {
    id: PageIds.GalleryPageID,
    className: 'link__gallery link',
    text: {
      en: 'Gallery',
      ru: 'Галлерея'
    }
  }
]

export const GameNavigation = [
  {
    category: {
      en: 'Warm up',
      ru: 'Разминка'
    }
  },
  {
    category: {
      en:'Passerines',
      ru: 'Воробьиные'
    }
  },
  {
    category: {
      en: 'Forest',
      ru: 'Лесные птицы'
    }
  },
  {
    category: {
      en: 'Songbirds',
      ru: 'Певчие птицы'
    }
  },
  {
    category: {
      en: 'Predatory',
      ru: 'Хищные птицы'
    }
  },
  {
    category: {
      en: 'Sea',
      ru: 'Морские птицы'
    }
  }
]

export const links = [
  {
    className: 'footer-container__author',
    href: 'https://github.com/ViktorElenich',
    target: '_blank',
    text: {
      en: '© 2022 Viktor Elenich',
      ru: '© 2022 Виктор Еленич'
    }
  },
  {
    className: 'footer-container__logo-rss',
    href: 'https://rs.school/js/',
    target: '_blank',
    text: {
      en: '',
      ru: ''
    }
  }
]

export const tableTh = ['№', 'Name', 'Score']
