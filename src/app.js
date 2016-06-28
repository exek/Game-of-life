import GameOfLife from './game-of-life';

const options = {
  welcome: 'welcome'
}

console.clear();
const game = new GameOfLife(options);
game.run();
