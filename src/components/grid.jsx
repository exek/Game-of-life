import React from 'react';
import _ from 'lodash';

export default class Grid extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dragging: false
    }
  }

  handleMouseDown() {
    this.setState({dragging: true});
  }

  handleMouseUp() {
    this.setState({dragging: false});
  }

  handleMouseMove(e) {
    if(this.state.dragging && e.target.classList.contains('cell')) {
      const grid = this.props.grid;
      const i = e.target.dataset.i;
      if(grid.isCellDead(i))
      this.props.grid.createCell(i);
      this.setState({dragging: true});
    }
  }

  getRows() {
    const rows = [];
    const grid = this.props.grid;

    for(let y = 0; y < grid.height; y++) {
      let row = [];
      for(let x = 0; x < grid.width; x++) {
        let i = grid.convertCellCoordsToIndex(x, y);
        row.push(<div key={i} data-i={i} className={"cell " + (grid.isCellLive(i) ? "alive" : "dead")} />)
      }
      rows.push(<div clasName="row" key={"row-" + y}>{row}</div>);
    }
    return rows;
  }

  render() {
    return (
      <div
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        className="cells">{this.getRows()}
      </div>
    )
  }
}
