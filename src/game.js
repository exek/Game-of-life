import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import GameOfLifeView from './components/game';
import Grid from './grid';

export default class GameOfLife {
  constructor() {
    this.running = false;
    this.speed = 100;
    this.iteration = 0;

    this.controls = {
      game: {
        controls: [
          {title: 'start', action: this.start.bind(this)},
          {title: 'pause', action: this.pause.bind(this)},
          {title: 'clear', action: this.clear.bind(this)},
          {title: 'fill', action: this.fill.bind(this)},
        ]
      },
      speed: {
        controls: [
          {title: 'slow', action: this.setSpeed.bind(this, 600)},
          {title: 'normal', action: this.setSpeed.bind(this, 300)},
          {title: 'fast', action: this.setSpeed.bind(this, 100)}
        ]
      }
    }
  }

  loadEmptyGrid(width = 25, height = 25) {
    this.width  = width;
    this.height = height;

    this.grid = new Grid(width, height);
  }

  loadGeneratedGrid(width = 25, height = 25) {
    this.loadEmptyGrid(width, height);
    this.grid.fillRandom();
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

  fill() {
    this.reset();
    this.loadGeneratedGrid(this.width, this.height);
  }

  reset() {
    this.iteration = 0;
    this.running = false;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
    console.log(this.speed);
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
      <GameOfLifeView controls={this.controls} grid={this.grid} iteration={this.iteration}/>,
      document.getElementById('root')
    );
  }
}
