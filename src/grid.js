export default class Grid {
  constuctor(width, height) {
    this.width = width;
    this.height = height;

    this.cells = Array(width*height).fill(false);
  }
}
