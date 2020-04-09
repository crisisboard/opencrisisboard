import React, { Component } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import styles from './styles.css';
import './styles.css';

import DiscussionPin from './DiscussionPin';

class MapView extends Component {
  constructor(props) {
    super(props);
  }

  render () {

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

    let containerClassName = '', leafletContainerClassName = '';
    if (forumFeedMapViewContainer) {
      containerClassName = styles.mapViewContainer;
      leafletContainerClassName = styles.leafletContainer;
    } else if (singleDiscussionMapViewContainer) {
      containerClassName = styles.singleDiscussionMapViewContainer;
      leafletContainerClassName = styles.singleDiscussionLeaftLetContainer;
    }

    return mapCenterStateSet ? (
      <div className={containerClassName}>
        <Map
          center={center}
          zoom={zoom}
          className={leafletContainerClassName}
          zoomControl={!singleDiscussionMapViewContainer}
          >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {
            allDiscussions &&
            allDiscussions.map((discussion, index) =>
              <Marker key={index}
                position={[discussion.geoLocation.lat, discussion.geoLocation.lng]}>
                <Popup>
                  <DiscussionPin
                    lat={discussion.geoLocation.lat}
                    lng={discussion.geoLocation.lng}
                    discussion={discussion}
                  />
                </Popup>
              </Marker>
            )
          }
        </Map>
      </div>
    ) : null;
  }
}

MapView.defaultProps = {
  pinnedDiscussions: [],
  discussions: [],
  forumFeedMapViewContainer: false,
  singleDiscussionMapViewContainer: false
};

MapView.PropTypes = {
  pinnedDiscussions: React.PropTypes.array,
  discussions: React.PropTypes.array,

  // Only one of the following container bools can be set to true, this defines the size of the MapView
  forumFeedMapViewContainer: React.PropTypes.bool,
  singleDiscussionMapViewContainer: React.PropTypes.bool
};

export default MapView;