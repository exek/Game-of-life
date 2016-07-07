import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import GameOfLifeView from './components/game';
import Grid from './grid';

export default class GameOfLife {
  constructor() {
    this.timer = null;
    this.running = false;
    this.speed = 100;

    this.controls = {
      game: {
        controls: [
          {title: 'start', action: this.start.bind(this)},
          {title: 'pause', action: this.pause.bind(this)},
          {title: 'stop', action: this.stop.bind(this)},
          {title: 'reset', action: this.reset.bind(this)},
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

  loadTemplate(template) {
    this.template = template;

    this.grid = new Grid(this.template);
  }

  loadEmptyGrid(width = 25, height = 25) {
    this.template = null;

    this.width  = width;
    this.height = height;

    this.grid = new Grid(width, height);
  }

  loadLastGrid() {
    if(this.template) {
      this.loadTemplate(this.template);
    } else {
      this.loadEmptyGrid(this.width, this.height);
    }
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
    this.loadLastGrid();
  }

  pause() {
    this.running = false;
  }

  reset() {
    this.stop();
    this.start();
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
      <GameOfLifeView controls={this.controls} grid={this.grid}/>,
      document.getElementById('root')
    );
  }
}
