import React from 'react';
import Grid from './grid';

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

  changeSpeed(speed) {
    this.props.game.setSpeed(SPEED_MODES[speed].val);
    this.setState({speed: speed})
  }

  getGameSpeedControls() {
    return (
      <div className="controls speed-controls">
        {_.map(SPEED_MODES, (val, title) => (
          <button
            key={title}
            className={this.state.speed === title ? 'active' : ''}
            onClick={() => this.changeSpeed(title)}>
            {title}
          </button>
        ))}
      </div>
    )
  }

  chanegeBoardSize(size) {
    const {width, height} = BOARD_SIZES[size];
    this.props.game.loadEmptyGrid(width, height);
    this.setState({board: size})
  }

  getBoardSizeControls() {
    return (
      <div className="controls board-controls">
        {_.map(BOARD_SIZES, (size, title) => (
          <button
            key={title}
            className={this.state.board === title ? 'active' : ''}
            onClick={() => this.chanegeBoardSize(title)}>
            {title}
          </button>
        ))}
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
        {this.getBoardSizeControls()}
      </div>
    )
  }
}
