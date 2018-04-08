import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'font-awesome/css/font-awesome.css';

const FAButton = ({ iconName, size, style, onClick, disabled }) => {
  const classNames = classnames(
    'fa',
    `fa-${iconName}`,
    size && `fa-${size}`,
  );
  return (
    <span
      className={classNames}
      style={style}
      onClick={(...args) => !disabled && onClick(...args)}
    />
  );
};

FAButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.string,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

FAButton.defaultProps = {
  size: undefined,
  style: undefined,
  disabled: false,
  onClick: () => {},
};

export default FAButton;