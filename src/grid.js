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
  }

  initGrid() {
    //create 2d array and fill it with false
    this.cells = [];
    for(let i = 0; i < this.height; i++) {
      let row = [];
      for(let j = 0; j < this.width; j++) {
        row[j] = false;
      }
      this.cells[i] = row;
    }
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
    this.cells = rows.map(row => row.split('').map(el => el === "^"))
  }

  getCell(x, y) {
    return this.cells[y][x];
  }

  getCellNeighbours(x, y) {
    const neighbours = [
      [x - 1, y + 1],
      [x    , y + 1],
      [x + 1, y + 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y - 1],
      [x    , y - 1],
      [x + 1, y - 1]
    ];

    return neighbours.filter(([x, y]) => this.isCorrectNeighbour(x, y))
  }

  isCorrectNeighbour(x, y) {
    return !(x < 0 || y < 0 || x >= this.width || y >= this.height)
  }

  killCell(x, y) {
    this.cells[y][x] = false;
  }

  createCell(x, y) {
    this.cells[y][x] = true;
  }
}
