import React from 'react';
import FAButton from './FAButton';

class PlayButton extends React.PureComponent {

  render() {
    const { isPlaying, disabled, togglePlay } = this.props;
    return (
      <span>
        {isPlaying
          ? <FAButton iconName='pause-circle' size='2x' isHidden={disabled} onClick={togglePlay} />
          : <FAButton iconName='play-circle' size='2x' isHidden={disabled} onClick={togglePlay} />
        }
      </span>
    );
  }
}

export default PlayButton;