export class Components {

  container;

  constructor(tagName, className, id) {
    this.container = document.createElement(tagName);
    this.container.className = className;
    this.container.id = id;
  }

  render(){
    return this.container;
  }
}
