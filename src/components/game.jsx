import React from 'react';
import Grid from './grid';

export default class GameOfLifeView extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid />
      </div>
    )
  }
}
