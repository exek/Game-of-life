import GameOfLife from './game';
import Grid from './grid';
import _ from 'lodash';

console.clear();
const game = new GameOfLife(
  document.getElementById('game-app')
);
game.run();
