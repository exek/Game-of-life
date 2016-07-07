import React from 'react';
import Grid from './grid';

export default class GameOfLifeView extends React.Component{
  constructor(props) {
    super(props);
  }

  getGameControls() {
    const controls = this.props.controls.game.controls;
    return controls.map(control => (
      <button key={"game-" + control.title} onClick={control.action}>{control.title}</button>
    ))
  }

  getGameSpeedControls() {
    const controls = this.props.controls.speed.controls;
    return controls.map(control => (
      <button key={"speed-" + control.title} onClick={control.action}>{control.title}</button>
    ))
  }

  render() {
    this.getGameControls();
    return (
      <div>
        <div className="controls game-controls">
          {this.getGameControls()}
        </div>
        <Grid grid={this.props.grid}/>
        <div className="controls speed-controls">
          {this.getGameSpeedControls()}
        </div>
      </div>
    )
  }
}
