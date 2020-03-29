import React, { Component } from 'react';
import styles from './styles.css';

import DiscussionPin from './DiscussionPin';
import GoogleMapReact from 'google-map-react';

import { MAP_KEY } from '../../../config/credentials';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center
    };
  }

  render () {
    const {
      pinnedDiscussions,
      discussions
    } = this.props;

    let allDiscussions = discussions;
    if (discussions && pinnedDiscussions) {
      allDiscussions = discussions.concat(pinnedDiscussions);
    }

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
          {allDiscussions && allDiscussions.map((discussion, index) => {
            return (
              <DiscussionPin
                key={index}
                lat={discussion.geoLocation.lat}
                lng={discussion.geoLocation.lng}
                discussion={discussion}
              />
            )
          })}
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