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

    let containerClassName = '';
    if (this.props.forumFeedMapViewContainer) {
      containerClassName = styles.mapViewContainer;
    } else if (this.props.singleDiscussionMapViewContainer) {
      containerClassName = styles.singleDiscussionMapViewContainer;
    }

    return (
      <div className={containerClassName}>
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
  discussions: [],
  forumFeedMapViewContainer: false,
  singleDiscussionMapViewContainer: false,
  center: {} // TODO: default center ENV VAR here
};

MapView.PropTypes = {
  pinnedDiscussions: React.PropTypes.array,
  discussions: React.PropTypes.array,
  center: React.PropTypes.Object,

  // Only one of the following container bools can be set to true, this defines the size of the MapView
  forumFeedMapViewContainer: React.PropTypes.bool,
  singleDiscussionMapViewContainer: React.PropTypes.bool
};

export default MapView;