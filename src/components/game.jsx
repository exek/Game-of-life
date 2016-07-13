import React from 'react';
import GridView from './grid';
import Controls from './controls';

const BOARD_SIZES = {
  '50x30':  {width: 50,  height: 30},
  '70x50':  {width: 70,  height: 50},
  '100x80': {width: 100, height: 80}
};

const SPEED_MODES = {
  'slow': {val: 600},
  'normal': {val: 300},
  'fast': {val: 100}
}

export default class GameOfLifeView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      speed: 'normal',
      board: '50x30'
    }

    const game = props.game;
    game.setSpeed(SPEED_MODES[this.state.speed].val);
    game.loadGeneratedGrid(
      BOARD_SIZES[this.state.board].width,
      BOARD_SIZES[this.state.board].height
    );
  }

  getGameControls() {
    const game = this.props.game;
    return (
      <div className="controls game-controls">
        <div className="controls-row">
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
      </div>
    )
  }

  onChangeSpeed(speed) {
    this.props.game.setSpeed(SPEED_MODES[speed].val);
    this.setState({speed: speed})
  }

  onChanegeBoardSize(size) {
    const {width, height} = BOARD_SIZES[size];
    this.props.game.loadEmptyGrid(width, height);
    this.setState({board: size})
  }

  render() {
    const game = this.props.game;
    return (
      <div className="game-wrapper">
        <GridView grid={game.grid}/>
        <div className="controls-container">
          <div>Iteration: {game.iteration}</div>

          {this.getGameControls()}
          <Controls
            title="Speed: "
            action={this.changeSpeed.bind(this)}
            controls={_.keys(SPEED_MODES)}
            active={this.state.speed}
          />
          <Controls
            title="Size: "
            action={this.chanegeBoardSize.bind(this)}
            controls={_.keys(BOARD_SIZES)}
            active={this.state.board}
          />
        </div>
      </div>
    )
  }
}
