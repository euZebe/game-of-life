import React from 'react';
import RowOfHexaCells from './RowOfHexaCells';
import RowOfRectangularCells from './RowOfRectangularCells';
import FAButton from './FAButton';
import PlayButton from './PlayButton';

const styles = {
  container: {
    margin: '20px',
  },
  hidden: {
    visibility: 'hidden',
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
    const { canRedo, canUndo, onUndo, onRedo, togglePlay, isPlaying } = this.props;
    return (
      <div style={styles.container}>
        <div>
          <FAButton size='2x' iconName='arrow-left' onClick={onUndo} style={!canUndo ? styles.hidden : null} />
          <FAButton size='2x' iconName='arrow-right' onClick={onRedo} style={!canRedo ? styles.hidden: null} />
          <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} disabled={!canRedo} />
        </div>
        {this.renderCells()}
      </div>
    );
  }
}

export default Board;