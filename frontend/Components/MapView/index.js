import React, { Component } from 'react';
import styles from './styles.css';

import DiscussionPin from './DiscussionPin';
import GoogleMapReact from 'google-map-react';

class MapView extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    const MAP_KEY = process.env.REACT_APP_MAP_KEY;

    const {
      pinnedDiscussions,
      discussions,
      forumFeedMapViewContainer,
      singleDiscussionMapViewContainer,
      center,
      zoom,
      mapCenterStateSet
    } = this.props;

    let allDiscussions = discussions;
    if (discussions && pinnedDiscussions) {
      allDiscussions = discussions.concat(pinnedDiscussions);
    }

    let containerClassName = '';
    if (forumFeedMapViewContainer) {
      containerClassName = styles.mapViewContainer;
    } else if (singleDiscussionMapViewContainer) {
      containerClassName = styles.singleDiscussionMapViewContainer;
    }

    return mapCenterStateSet ? (
      <div className={containerClassName}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: MAP_KEY,
            language: 'en'
          }}
          center={center}
          defaultZoom={zoom}
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
    ) : null;
  }
}

MapView.defaultProps = {
  pinnedDiscussions: [],
  discussions: [],
  forumFeedMapViewContainer: false,
  singleDiscussionMapViewContainer: false,
};

MapView.PropTypes = {
  pinnedDiscussions: React.PropTypes.array,
  discussions: React.PropTypes.array,

  // Only one of the following container bools can be set to true, this defines the size of the MapView
  forumFeedMapViewContainer: React.PropTypes.bool,
  singleDiscussionMapViewContainer: React.PropTypes.bool
};

export default MapView;