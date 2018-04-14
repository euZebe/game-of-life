import React from 'react';
import FAButton from './FAButton';

const styles = {
  hidden: {
    visibility: 'hidden',
  }
};

class PlayButton extends React.Component {

  render() {
    const { isPlaying, disabled, togglePlay } = this.props;
    return (
      <span style={disabled ? styles.hidden : null}>
        {isPlaying
          ? <FAButton iconName='pause-circle' size='2x' onClick={togglePlay} />
          : <FAButton iconName='play-circle' size='2x' onClick={togglePlay} />
        }
      </span>
    );
  }
}

export default PlayButton;