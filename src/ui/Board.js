import React from 'react';
import RowOfHexaCells from './RowOfHexaCells';
import RowOfRectangularCells from './RowOfRectangularCells';
import UndoRedoButtons from "./UndoRedoButtons";

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
    const { canRedo, canUndo, onUndo, onRedo } = this.props;
    return (
      <div style={styles.container}>
        <UndoRedoButtons canRedo={canRedo} canUndo={canUndo} onUndo={onUndo} onRedo={onRedo} />
        {this.renderCells()}
      </div>
    );
  }
}

export default Board;