export class Page {

  container;

  constructor(id) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  render() {
    return this.container;
  }

  afterRender() {
  }
}
