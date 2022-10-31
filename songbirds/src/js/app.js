import { Header } from "./components/header/header";

export class App {
  static container = document.body;
  header = Header;

  constructor() {
    this.header = new Header('header', 'header', 'header');
  }

  run() {
    App.container.append(this.header.render());
  }
}
