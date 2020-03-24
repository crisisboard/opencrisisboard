import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

import { MAP_KEY } from '../../../config/credentials';

import DiscussionPin from './DiscussionPin';
import GoogleMapReact from 'google-map-react';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center
    };

    this.onChildMouseEnter = this.onChildMouseEnter.bind(this);
    this.onChildMouseLeave = this.onChildMouseLeave.bind(this);
  }

  onChildMouseEnter () {

  }

  onChildMouseLeave () {

  }

  render () {

    const {
      discussions
    } = this.props;

    return (
      <div className={styles.mapViewContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: MAP_KEY,
            language: 'en'
          }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          yesIWantToUseGoogleMapApiInternals
        >
          {discussions.map(discussion => (
            <DiscussionPin
              // TODO: add data props
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

MapView.defaultProps = {
  discussions: []
};

MapView.PropTypes = {
  discussions: React.PropTypes.array
};

export default MapView;