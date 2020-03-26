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
      pinnedDiscussions,
      discussions
    } = this.props;

    console.log('inside mapview discs', pinnedDiscussions, discussions);

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
          {discussions && discussions.map(discussion => (
            <DiscussionPin
              // TODO: Discussions should really have a proper id field in the db
              key={discussion._id}
              lat={discussion.geoLocation.lat}
              lng={discussion.geoLocation.lng}
              text={'Marker baby'}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

MapView.defaultProps = {
  pinnedDiscussions: [],
  discussions: []
};

MapView.PropTypes = {
  pinnedDiscussions: React.PropTypes.array,
  discussions: React.PropTypes.array
};

export default MapView;