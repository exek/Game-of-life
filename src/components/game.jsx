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

const FILL_MODES = {
  'low': {val: .1},
  'normal': {val: .4},
  'high': {val: .7}
}

export default class GameView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      speed: 'normal',
      board: '50x30'
    }

    const game = props.game;
    game.setSpeed(SPEED_MODES[this.state.speed].val);
    game.loadEmptyGrid(
      BOARD_SIZES[this.state.board].width,
      BOARD_SIZES[this.state.board].height
    );
    game.fill(FILL_MODES['normal'].val)
  }

  getGameControls() {
    const game = this.props.game;
    return (
      <div className="controls game-controls">
        <div className="controls-row">
          <button
            className={game.running ? 'active' : ''}
            onClick={() => game.start()}>
            <i className="fa fa-play" />
          </button>
          <button
            className={!game.running ? 'active' : ''}
            onClick={() => game.pause()}>
            <i className="fa fa-pause" />
          </button>
          <button onClick={() => game.clear()}>
            <i className="fa fa-stop" />
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

  onGenerateBoard(mode = 'normal') {
    const coeff = FILL_MODES[mode].val;
    this.props.game.fill(coeff);
  }

  render() {
    const game = this.props.game;
    return (
      <div className={"game-wrapper board-" + this.state.board}>
        <GridView grid={game.grid}/>
        <div className="controls-container">
          <div>Iteration: {game.iteration}</div>

          {this.getGameControls()}
          <Controls
            title="Generate: "
            action={this.onGenerateBoard.bind(this)}
            controls={_.keys(FILL_MODES)}
          />
          <Controls
            title="Speed: "
            action={this.onChangeSpeed.bind(this)}
            controls={_.keys(SPEED_MODES)}
            active={this.state.speed}
          />
          <Controls
            title="Size: "
            action={this.onChanegeBoardSize.bind(this)}
            controls={_.keys(BOARD_SIZES)}
            active={this.state.board}
          />
        </div>
      </div>
    )
  }
}
