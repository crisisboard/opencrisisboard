import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

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
    const defaultProps = {
      center: {lat: 40.73, lng: -73.93},
      zoom: 12,
    };

    return (
      <div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: this.props.apiKey,
            language: 'en'
          }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >

        </GoogleMapReact>
      </div>
    );
  }
};

MapView.defaultProps = {

};

MapView.PropTypes = {

};

export default MapView;