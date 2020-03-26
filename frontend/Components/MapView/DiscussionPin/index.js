import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

const DiscussionPin = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
};

DiscussionPin.defaultProps = {

};

DiscussionPin.PropTypes = {

};

export default DiscussionPin;