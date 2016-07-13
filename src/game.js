import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import GameView from './components/game';
import Grid from './grid';

export default class GameOfLife {
  constructor() {
    this.running = false;
    this.speed = 100;
    this.iteration = 0;
  }

  loadEmptyGrid(width = 25, height = 25) {
    this.width  = width;
    this.height = height;

    this.grid = new Grid(width, height);
  }

  start() {
    this.running = true;
  }

  pause() {
    this.running = false;
  }

  clear() {
    this.reset();
    this.loadEmptyGrid(this.width, this.height);
  }

  fill(coeff) {
    this.clear();
    this.grid.fillRandom(coeff);
  }

  reset() {
    this.iteration = 0;
    this.running = false;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  run() {

    let previous = Date.now();
    let lag = 0.0;

    const loop = () => {
      let current = Date.now();
      let elapsed = current - previous;
      previous = current;
      lag += elapsed;

      while (lag >= this.speed) {
        if(this.running) this.updateGrid();
        lag -= this.speed;
      }

      this.render();
      requestAnimationFrame(loop);
    };

    loop();
  }

  updateGrid() {
    const cellsToEvaluate = this.getCellsToEvaluate();
    const {cellsToDie, cellsToBeBorn} = this.filterCellsWillChange(cellsToEvaluate);

    _.each(cellsToDie, i => this.grid.killCell(i));
    _.each(cellsToBeBorn, i => this.grid.createCell(i));

    this.iteration++;
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
    ReactDOM.render(
      <GameView game={this}/>,
      document.getElementById('root')
    );
  }
}
