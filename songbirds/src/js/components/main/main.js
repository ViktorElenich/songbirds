import {Components} from "../../templates/components";

export class Main extends Components {
  constructor(tagName, className, id) {
    super(tagName, className, id);
  }

  render() {
    return this.container;
  }
}
