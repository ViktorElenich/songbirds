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
    text: 'Home'
  },
  {
    id: PageIds.GamePageID,
    className: 'link__game link',
    text: 'Game'
  },
  {
    id: PageIds.ScorePageID,
    className: 'link__score link',
    text: 'Score'
  },
  {
    id: PageIds.GalleryPageID,
    className: 'link__gallery link',
    text: 'Gallery'
  }
]

export const GameNavigation = [
  {category: 'Warm up'},
  {category: 'Passerines'},
  {category: 'Forest'},
  {category: 'Songbirds'},
  {category: 'Predatory'},
  {category: 'Sea'}
]

export const tableTh = ['№', 'Name', 'Score']
