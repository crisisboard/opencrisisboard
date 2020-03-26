import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

const DiscussionPinTooltip = (props) => {
  return props.open ? <span className={styles.discussionPinTooltipContainer}>
    <p className={styles.discussionPinTooltipText}>This is a discussion pin tooltip!</p>
    <svg
      onClick={props.handleClose}
      className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
            clipRule="evenodd"/>
      <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
            clipRule="evenodd"/>
    </svg>
  </span> : null;
};

DiscussionPinTooltip.defaultProps = {

};

DiscussionPinTooltip.PropTypes = {
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func
};

export default DiscussionPinTooltip;