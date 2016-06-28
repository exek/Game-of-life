import React from 'react';

export default class GameOfLifeView extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.welcome}</div>
    )
  }
}
