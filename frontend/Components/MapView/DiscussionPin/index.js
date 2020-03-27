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
      <div>
        <div className={styles.discussionPinContainer} onClick={this.handleOpenTooltip}>
          <p className={styles.discussionPinNumberTag}>
            {this.props.numberTag}
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
  // TODO: Fill these in
};

DiscussionPin.PropTypes = {
  key: React.PropTypes.number,
  numberTag: React.PropTypes.number,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  discussion: React.PropTypes.Object
};

export default DiscussionPin;