import React from 'react';
import Grid from './grid';

export default class GameOfLifeView extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div className="controls">
          <button onClick={this.props.controls.start}>Start</button>
          <button onClick={this.props.controls.stop}>Stop</button>
          <button onClick={this.props.controls.reset}>Reset</button>
          <button onClick={this.props.controls.pause}>Pause</button>
        </div>
        <Grid grid={this.props.grid}/>
      </div>
    )
  }
}
