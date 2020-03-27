import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import styles from './styles.css';

const DiscussionPinTooltip = (props) => {
  return props.open ? <div className={styles.tooltip}>
    <div className={styles.closeButtonSVGWrapper} onClick={props.handleClose}>
      <svg
        className={styles.tooltipArrowSVG}
        enableBackground='new 0 0 29 14' height='14px' id='Layer_1' version='1.1' viewBox='0 0 29 14' width='29px' xmlSpace='preserve' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
        <polygon className={styles.tooltipArrowSVGPoly} points='0.15,0 14.5,14.35 28.85,0 '/>
      </svg>
      <svg
        className={classnames(styles.closeButtonSVG, 'bi bi-x')} width='1em' height='1em' viewBox='0 0 16 16'
           xmlns='http://www.w3.org/2000/svg'>
        <path fillRule='evenodd' d='M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z'
              clipRule='evenodd'/>
        <path fillRule='evenodd' d='M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z'
              clipRule='evenodd'/>
      </svg>
    </div>
    <div className={styles.tooltipTextWrapper}>
      <p className={styles.tooltipTextTitle}>
        {props.discussion.title}
      </p>
      <p className={styles.tooltipTextAuthor}>
        Created by: {props.discussion.user.name}
      </p>
      <Link className={styles.tooltipDiscussionLink} to={`/${props.discussion.forum.forum_slug}/discussion/${props.discussion.discussion_slug}`}>
        Go to discussion
      </Link>
    </div>
  </div> : null;
};

DiscussionPinTooltip.defaultProps = {

};

DiscussionPinTooltip.PropTypes = {
  link: React.PropTypes.string,
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
  discussion: React.PropTypes.Object
};

export default DiscussionPinTooltip;