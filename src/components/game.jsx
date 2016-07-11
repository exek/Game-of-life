import React from 'react';
import Grid from './grid';

export default class GameOfLifeView extends React.Component{
  constructor(props) {
    super(props);
  }

  getGameControls() {
    const game = this.props.game;
    return (
      <div className="controls game-controls">
        <button onClick={() => game.start()}>
          <i className="fa fa-play" />
        </button>
        <button onClick={() => game.pause()}>
          <i className="fa fa-pause" />
        </button>
        <button onClick={() => game.clear()}>
          <i className="fa fa-stop" />
        </button>
        <button onClick={() => game.fill()}>
          <i className="fa fa-random" />
        </button>
      </div>
    )
  }

  getGameSpeedControls() {
    return (
      <div className="controls speed-controls">
        <button onClick={() => game.setSpeed(600)}>slow</button>
        <button onClick={() => game.setSpeed(300)}>normal</button>
        <button onClick={() => game.setSpeed(100)}>fast</button>
      </div>
    )
  }

  render() {
    const game = this.props.game;
    return (
      <div>
        <div>{game.iteration}</div>
        {this.getGameControls()}
        <Grid grid={game.grid}/>
        {this.getGameSpeedControls()}
      </div>
    )
  }
}
