import React from 'react';
import styled from 'styled-components';
import RowOfHexaCells from './RowOfHexaCells';
import RowOfRectangularCells from './RowOfRectangularCells';
import FAButton from './FAButton';
import PlayButton from './PlayButton';

const Container = styled.div`
  margin: 20px;
`;

class Board extends React.PureComponent {

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
    return <div/>;
  };

  render() {
    const { canRedo, canUndo, onUndo, onRedo, togglePlay, isPlaying } = this.props;
    return (
      <Container id='board'>
        <div>
          <FAButton size='2x' iconName='arrow-left' onClick={onUndo} isHidden={!canUndo} />
          <FAButton size='2x' iconName='arrow-right' onClick={onRedo} isHidden={!canRedo} />
          <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} disabled={!canRedo}/>
        </div>
        {this.renderCells()}
      </Container>
    );
  }
}

export default Board;