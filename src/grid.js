import _ from 'lodash';

export default class Grid {

  constructor(...args) {
    if(args.length === 1) {
      //if argument is grid map
      const gridMap = args[0];
      this.initGridFromMap(gridMap);
    } else {
      //if argument is width and height
      const [width, height] = args;
      this.width = width;
      this.height = height;

      this.initGrid();
    }

    this.cachedNeighbours = new Map();
  }

  initGrid() {
    this.cells = Array(this.height, this.width).fill(false);
  }

  initGridFromMap(gridMap) {
    const trimmedGridMap = gridMap.trim();
    const rows = gridMap.split('\n').filter(row => row.length);

    if(rows.length === 0) throw Error('Invalid grid map');

    const height = rows.length;
    const width  = rows[0].length;

    if(rows.some(row => row.length != width)) throw Error('Invalid grid map');

    this.width = width;
    this.height = height;
    this.cells = _.concat(...rows.map(row => row.split('').map(el => el === "^")))
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
    if(this.cachedNeighbours.has(i))
      return this.cachedNeighbours.get(i);

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

  killCell(i) {
    this.cells[i] = false;
  }

  createCell(i) {
    this.cells[i] = true;
  }
}
