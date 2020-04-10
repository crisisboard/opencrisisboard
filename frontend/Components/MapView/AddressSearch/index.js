import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import { Search } from "../Controls";

import styles from "./styles.css";

import {
  getDefaultCenter,
  getBrowserLocation,
} from "../../../Utils/geolocation";

class AddressSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: getDefaultCenter(),
      currentPosition: null,
    };
    this.getPosition = this.getPosition.bind(this);
  }

  componentDidMount() {
    getBrowserLocation((position) => {
      this.setState({
        center: [position.lat, position.lng],
      });
    });
  }

  getPosition(position) {
    this.setState({ currentPosition: position });

    this.props.onLocationReceived(position);
  }

  render() {
    return (
      <Map
        center={this.state.center}
        zoom={13}
        className={styles.leafletContainer}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Search onPositionGet={this.getPosition} />
      </Map>
    );
  }
}

export default AddressSearch;
