import _ from 'lodash';

export default class Grid {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = _.times(this.height * this.width, () => false);

    this.cachedNeighbours = new Map();
  }

  fillRandom(coeff = .5) {
    console.log(this);
    _.each(this.cells, (val, i) => {
      if(Math.random() < coeff) this.createCell(i)
    })
  }

  getCellCoords(i) {
    return {
      x: i%this.width,
      y: Math.floor(i/this.width)
    }
  }

  convertCellCoordsToIndex(x, y) {
    return y*this.width + x;
  }

  getCell(i) {
    return this.cells[i];
  }

  getCellNeighbours(i) {
    //check in cache
    if(this.cachedNeighbours.has(i)){
      return this.cachedNeighbours.get(i);
    }

    const {x, y} = this.getCellCoords(i);
    const possibleNeighbours = [
      [x - 1, y + 1],
      [x    , y + 1],
      [x + 1, y + 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y - 1],
      [x    , y - 1],
      [x + 1, y - 1]
    ];

    const neighbours = possibleNeighbours
      .filter(([x, y]) => this.isCorrectNeighbour(x, y))
      .map(([x, y]) => this.convertCellCoordsToIndex(x, y));

    this.cachedNeighbours.set(i, neighbours);
    return neighbours;
  }

  getUniqueCellsNeighours(indexes) {
    const uniqueNeighbours = new Set();
    _.each(indexes, i => {
      _.each(this.getCellNeighbours(i), neighbourIndex => {
        uniqueNeighbours.add(neighbourIndex);
      });
    });
    return [...uniqueNeighbours];
  }

  isCorrectNeighbour(x, y) {
    return !(x < 0 || y < 0 || x >= this.width || y >= this.height)
  }

  getLiveCells() {
    return this.cells.reduce((acc , cell, i) => {
      if (cell) acc.push(i);
      return acc;
    }, []);
  }

  getCellLiveNeighbours(i) {
    return this.getCellNeighbours(i)
      .filter(neighbourIndex => this.cells[neighbourIndex])
  }

  getCellLiveNeighboursCount(i) {
    return this.getCellLiveNeighbours(i).length;
  }

  isCellLive(i) {
    return this.cells[i];
  }

  isCellDead(i) {
    return !this.cells[i];
  }

  killCell(i) {
    this.cells[i] = false;
  }

  createCell(i) {
    this.cells[i] = true;
  }
}
