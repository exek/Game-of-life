import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import GameOfLifeView from './components/game';
import Grid from './grid';

export default class GameOfLife {
  constructor(options) {
    if(options.gridMap) {
      this.grid = new Grid(options.gridMap);
    } else {
      const {width = 100, height = 100} = options;
      this.grid = new Grid(this.heigth, this.width);
    }
  }

  run() {
    this.render();
  }

  loop() {

  }

  updateGrid() {
    const cellsToEvaluate = this.getCellsToEvaluate();
    const {cellsToDie, cellsToBeBorn} = this.filterCellsWillChange(cellsToEvaluate);

    _.each(cellsToDie, i => this.grid.killCell(i));
    _.each(cellsToBeBorn, i => this.grid.createCell(i));
  }

  getCellsToEvaluate() {
    const liveCells = this.grid.getLiveCells();
    const liveCellsNeighbours = this.grid.getUniqueCellsNeighours(liveCells);

    const cellsToEvaluate = [...new Set([
      ...liveCells,
      ...liveCellsNeighbours
    ])];

    return cellsToEvaluate;
  }

  filterCellsWillChange(cells) {
    const cellsToDie = [];
    const cellsToBeBorn = [];

    _.each(cells, (i) => {

      if(this.grid.isCellLive(i) && this.checkIfCellWillBeDead(i)) {
        cellsToDie.push(i);
      } else if(this.grid.isCellDead(i) && this.checkIfCellWillBeBorn(i)){
        cellsToBeBorn.push(i)
      }
    });

    return {cellsToDie, cellsToBeBorn};
  }

  checkIfCellWillBeDead(i) {
    const liveNeighboursCount = this.grid.getCellLiveNeighboursCount(i);
    return liveNeighboursCount < 2 || liveNeighboursCount > 3;
  }

  checkIfCellWillBeBorn(i) {
    const liveNeighboursCount = this.grid.getCellLiveNeighboursCount(i);
    return liveNeighboursCount == 3;
  }

  render() {
    const options = {
      width: this.width,
      height: this.height,
      grid: this.grid,
    };
    ReactDOM.render(<GameOfLifeView {...options}/>, document.getElementById('root'));
  }
}
