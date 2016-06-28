import React from 'react';
import ReactDOM from 'react-dom';

import GameOfLifeView from './game-of-life-view';

export default class GameOfLife {
  constructor(options) {
    this.welcome = options.welcome || 'hello';
  }

  run() {
    this.update();
  }

  update() {
    ReactDOM.render(<GameOfLifeView welcome={this.welcome}/>, document.getElementById('root'));
  }
}
