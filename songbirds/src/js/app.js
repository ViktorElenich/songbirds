import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { Footer } from "./components/footer/footer";
import { Page } from "./templates/pages";
import { MainPage } from "../pages/main/main-page";
import { GamePage } from "../pages/game/game-page";
import { PageIds } from "../helpers";

export class App {
  static container = document.body;
  static defaultPageId = 'current-page';
  initialPage = MainPage;
  header = Header;
  main = Main;
  footer = Footer;

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header', 'header');
    this.main = new Main('main', 'main', 'main');
    this.footer = new Footer('footer', 'footer', 'footer');
  }

  static renderNewPage(id) {
    const currentPage = document.querySelector(`#${App.defaultPageId}`);
    let page = Page;

    if (currentPage) currentPage.remove();
    if (id === PageIds.MainPageID) {
      page = new MainPage(id);
    } else if (id === PageIds.GamePageID) {
      page = new GamePage(id);
    }

    if (page) {
      const pageHTML = page.render();
      const mainDiv = document.getElementById('main');
      pageHTML.id = App.defaultPageId;
      mainDiv.append(pageHTML);
      page.afterRender();
    }
  }

  enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    })
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.main.render());
    App.renderNewPage('game-page');
    App.container.append(this.footer.render());
    this.enableRouteChange();

    window.location.replace("#game-page");
    if (typeof window.history.replaceState == "function") {
      history.replaceState({}, "", window.location.href.slice(0, 0));
    }
  }
}