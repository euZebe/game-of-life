import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.css';
import classnames from 'classnames';

// className is given by the Styled parent ; don't forget to add it to computed classnames
class UnstyledFAButton extends React.PureComponent {

  render() {
    const { iconName, size, className, onClick, disabled } = this.props;
    const classNames = classnames(
      'fa',
      `fa-${iconName}`,
      size && `fa-${size}`,
      className,
    );
    return (
      <span
        className={classNames}
        onClick={(...args) => !disabled && onClick(...args)}
      />
    );
  }
}

UnstyledFAButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

UnstyledFAButton.defaultProps = {
  size: undefined,
  disabled: false,
  onClick: () => {
  },
};

const FAButton = styled(UnstyledFAButton)`
  visibility: ${({ isHidden }) => isHidden ? 'hidden' : 'default'};
`;

FAButton.propTypes = {
  isHidden: PropTypes.bool,
};

FAButton.defaultProps = {
  isHidden: false,
};

export default FAButton;
