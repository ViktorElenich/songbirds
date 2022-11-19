import { Page } from "../../js/templates/pages";
import { customCreateElement } from "../../js/utils/utils";
import { tableTh } from "../../helpers";

export class ScorePage extends Page {
  constructor(id) {
    super(id);
    this.result = JSON.parse(localStorage.getItem('score'));
  }

  renderWrapper() {
    const homeLink = document.querySelector('.link__home');
    const gameLink = document.querySelector('.link__game');
    const scoreLink = document.querySelector('.link__score');
    homeLink.classList.remove('active');
    gameLink.classList.remove('active');
    scoreLink.classList.add('active');

    this.scoreCont = document.querySelector('.header-container__score');
    this.scoreCont.innerHTML = `Score: 0`;

    const scorePage = customCreateElement('div', 'score-page');
    const scoreContainer = customCreateElement('div', 'score-page__container');
    const scoreWrapper = customCreateElement('div', 'res-wrapper');
    const table = customCreateElement('table', 'table');
    const tr = customCreateElement('tr', 'table-tr');
    tableTh.map((el) => {
      const th = customCreateElement('th', 'table-th', '', `${el}`);
      tr.append(th);
    });
    table.append(tr);
    const arr = [];
    if (this.result == null) {
      const tr = 'no result'
      table.append(tr)
    } else {
      this.result.map((el, idx) => {
        const tdRes = `<td>${idx+1}</td><td>${el.name}</td><td>${el.score}</td>`;
        arr.push(tdRes);
      });
      for (let i = 0; i < arr.length; i++) {
        const trRes = customCreateElement('tr');
        trRes.innerHTML = arr[i]
        table.append(trRes);
      }
    }
    scoreWrapper.append(table);
    scoreContainer.append(scoreWrapper);
    scorePage.append(scoreContainer)
    this.container.append(scorePage);
  }

  render() {
    this.renderWrapper();
    return this.container;
  }
}
