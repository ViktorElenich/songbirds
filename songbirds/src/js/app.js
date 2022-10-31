import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

export class App {
  static container = document.body;
  header = Header;
  footer = Footer;

  constructor() {
    this.header = new Header('header', 'header', 'header');
    this.footer = new Footer('footer', 'footer', 'footer');
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.footer.render());
  }
}
