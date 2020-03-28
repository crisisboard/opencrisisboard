import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

import { MAP_KEY } from '../../../config/credentials';

import DiscussionPin from './DiscussionPin';
import GoogleMapReact from 'google-map-react';

// TODO: Maybe this can be a functional component
class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center
    };
  }

  render () {

    // TODO: Do I need pinned and non-pinned discussions?
    const {
      pinnedDiscussions,
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
          {/* TODO: pinned discussions also need to be shown here, duh */}
          {discussions && discussions.map((discussion, index) => {
            return (
              <DiscussionPin
                // TODO: Discussions should really have a proper id field in the db
                key={index}
                numberTag={index + 1}
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