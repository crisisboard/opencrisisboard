import React, { Component } from 'react';
import Moment from 'moment';
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
    const time = Moment(this.props.discussion.date);
    const timeDisplay = time.from(Moment());

    return (
      <div>
        <div className={styles.discussionPinContainer} onClick={this.handleOpenTooltip}>
          <p className={styles.discussionPinNumberTag}>
            {timeDisplay}
          </p>
        </div>
        <DiscussionPinTooltip
          discussion={this.props.discussion}
          open={this.state.tooltipOpen}
          handleClose={this.handleCloseTooltip}
        />
      </div>
    );
  }
}

DiscussionPin.defaultProps = {
  lat: 0,
  lng: 0,
  discussion: {}
};

DiscussionPin.PropTypes = {
  key: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  discussion: React.PropTypes.Object
};

export default DiscussionPin;