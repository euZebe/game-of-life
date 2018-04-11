import React from 'react';
import Cell from './Cell';
import RowOfHexaCells from './RowOfHexaCells';
import RowOfRectangularCells from './RowOfRectangularCells';

const styles = {
  container: {
    margin: '20px',
  },
};

class Board extends React.Component {

  renderCells = () => {
    const { tableOfCells, honeyComb, toggleStatus } = this.props;
    if (tableOfCells && tableOfCells.length) {
      return tableOfCells.map((row, index) =>
        <RowOfRectangularCells
          key={index}
          cells={row}
          yIndex={index}
          toggleStatus={toggleStatus}
        />
      );
    } else if (honeyComb && honeyComb.length) {
      return honeyComb.map((row, index) =>
        <RowOfHexaCells
          key={index}
          cells={row}
          yIndex={index}
          toggleStatus={toggleStatus}
        />
      );
    }
    return <div />;
  };

  render() {
    return (
      <div style={styles.container}>
        {this.renderCells()}
      </div>
    );
  }
}

export default Board;