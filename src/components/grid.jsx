import React from 'react';
import _ from 'lodash';

export default class Grid extends React.Component{
  getRows() {
    const rows = [];
    const grid = this.props.grid;

    for(let y = 0; y < grid.height; y++) {
      let row = [];
      for(let x = 0; x < grid.width; x++) {
        let i = grid.convertCellCoordsToIndex(x, y);
        row.push(<div key={i} className={grid.isCellLive(i) ? "alive" : "dead"} />)
      }
      rows.push(<div clasName="row" key={"row-" + y}>{row}</div>);
    }
    return rows;
  }

  render() {
    return (
      <div className="cells">{this.getRows()}</div>
    )
  }
}
