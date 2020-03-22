import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles';

class Button extends Component {
  render() {
    const {
      type,
      fullWidth,
      noUppercase,
      className,
      style,
      onClick,
      disabled,
      alwaysActive,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={classnames(
          styles.button,
          styles.buttonDefaults,
          styles[type],
          fullWidth && styles.fullWidth,
          noUppercase && styles.noUppercase,
          alwaysActive && styles.alwaysActive,
          className
        )}
        disabled={disabled}
        style={style}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  type: 'default',
  fullWidth: false,
  noUppercase: false,
  alwaysActive: false,
  className: '',
  style: {},
  onClick: () => { },
};

Button.propTypes = {
  type: React.PropTypes.oneOf(['default', 'outline', 'primary']),
  fullWidth: React.PropTypes.bool,
  noUppercase: React.PropTypes.bool,
  alwaysActive: React.PropTypes.bool,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool
};

export default Button;
