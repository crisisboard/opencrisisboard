import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

import DiscussionPinTooltip from '../DiscussionPinTooltip';

class DiscussionPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };

    this.handleOpenTooltip = this.handleOpenTooltip.bind(this);
    this.handleCloseTooltip = this.handleCloseTooltip.bind(this);
  }

  handleOpenTooltip () {
    console.log('open tooltip');
    this.setState({
      tooltipOpen: true
    });
  }

  handleCloseTooltip () {
    this.setState({
      tooltipOpen: false
    });
  }

  render () {
    return (
      <div className={styles.discussionPinContainer} onClick={this.handleOpenTooltip}>
        <p className={styles.discussionPinNumberTag}>{this.props.numberTag}</p>
        <DiscussionPinTooltip
          discussion={this.props.discussion}
          open={this.state.tooltipOpen}
          handleClose={this.handleCloseTooltip}
        />
      </div>
    );
  }
};

DiscussionPin.defaultProps = {

};

DiscussionPin.PropTypes = {
  key: React.PropTypes.number,
  numberTag: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number
};

export default DiscussionPin;