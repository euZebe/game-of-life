import React from 'react';
import { HexGrid, Layout, GridGenerator } from 'react-hexgrid';
import Cell from './Cell';
import HexaCell from './HexaCell';

const hexaSize = {x: 2, y: 2 };

class Board extends React.Component {

  renderRowOfCells = (cells, yIndex) => {
    const { toggleStatus } = this.props;
    return (
      <div key={yIndex}>
        {Object.values(cells).map((cellStatus, xIndex) => (
          <Cell key={`${yIndex} ${xIndex}`} status={cellStatus} toggleStatus={() => toggleStatus(xIndex, yIndex)}/>)
        )}
      </div>
    );
  };

  renderHoneyCombRow = (cells, yIndex) => {

  };

  renderCells = () => {
    const { tableOfCells, honeyComb, shape } = this.props;
    if (tableOfCells.length) {
      return tableOfCells.map(this.renderRowOfCells);
    } else if (honeyComb.length) {
      const moreHexas = GridGenerator.rectangle(shape.cols, shape.rows);
      return (
        <HexGrid width={1000} height={600}> // FIXME problem with grid with, depending on radius
          <Layout spacing={1.1} origin={{x: -70, y: -40}} flat={false} size={hexaSize} >
            {moreHexas.map((hex, i) => <HexaCell key={i} q={hex.q} r={hex.r} s={hex.s} status={honeyComb[i]}/>)}
          </Layout>
        </HexGrid>
      )
    }
    return <div />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderCells()}
      </React.Fragment>
    );
  }
}

export default Board;