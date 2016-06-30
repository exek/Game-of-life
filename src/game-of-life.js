import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import GameOfLifeView from './components/game';
import Grid from './grid';

export default class GameOfLife {
  constructor(options) {
    if(options.gridMap) {
      this.gridMap = options.gridMap;
    } else {
      this.gridMap = null;
      this.width  = options.width || 100;
      this.height = height.height || 100;
    }

    this.initGrid();

    this.timer   = null;
  }

  initGrid() {
    if(this.gridMap) {
      this.grid = new Grid(this.gridMap);
    } else {
      this.grid = new Grid(this.heigth, this.width);
    }
  }

  start() {
    clearInterval(this.timer);
    this.run();
    this.render();
  }

  stop() {
    clearInterval(this.timer);
    this.initGrid();
    this.render();
  }

  pause() {
    clearInterval(this.timer);
    this.render();
  }

  reset() {
    clearInterval(this.timer);
    this.initGrid();
    this.start();
    this.render();
  }

  run() {
    this.timer = setInterval(() => this.loop(), 200);
  }

  loop() {
    this.updateGrid();
    this.render();
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
      grid: this.grid,
      controls: {
        start: this.start.bind(this),
        pause: this.pause.bind(this),
        stop: this.stop.bind(this),
        reset: this.reset.bind(this)
      }
    };
    ReactDOM.render(<GameOfLifeView {...options}/>, document.getElementById('root'));
  }
}
