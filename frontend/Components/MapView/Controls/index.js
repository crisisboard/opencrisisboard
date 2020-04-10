import React, { Component } from "react";
import { MapControl, Marker } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { DomEvent } from "leaflet";

import { getGeolocationFromLatLng } from "../../../Utils/geolocation";

class MapSearch extends MapControl {
  createLeafletElement() {
    const geoSearchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(), // required
      showMarker: false, // optional: true|false  - default true
      showPopup: false, // optional: true|false  - default false
      popupFormat: ({ query, result }) => {
        result.label;
      }, // optional: function    - default returns result label
      maxMarkers: 1, // optional: number      - default 1
      retainZoomLevel: false, // optional: true|false  - default false
      animateZoom: true, // optional: true|false  - default true
      searchLabel: "Enter address", // optional: string      - default 'Enter address'
      autoClose: true,
      keepResult: true,
      style: "bar",
    });

    return geoSearchControl;
  }
}

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: null,
    };
    this.searchReference = null;
    this.searchBoxContainerReference = null;
    this.mapReference = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleDragAndDrop = this.handleDragAndDrop.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.registerMapEvents = this.registerMapEvents.bind(this);
  }

  componentDidMount() {
    this.registerMapEvents();
  }

  handleSearch(event) {
    const latitude = parseFloat(event.location.y);
    const longitude = parseFloat(event.location.x);

    const position = {
      lat: latitude,
      lng: longitude,
      label: event.location.label,
      address: event.location.raw.address,
    };

    this.setState({ currentPosition: position });

    this.props.onPositionGet(position);
  }

  async handleDragAndDrop(event) {
    const latitude = event.target._latlng.lat;
    const longitude = event.target._latlng.lng;

    await this.handleReverseSearch(latitude, longitude);
  }

  async handleClick(event) {
    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;

    await this.handleReverseSearch(latitude, longitude);
  }

  async handleReverseSearch(latitude, longitude) {
    const position = await getGeolocationFromLatLng(latitude, longitude);

    this.setState({ currentPosition: position });

    this.props.onPositionGet(position);

    this.searchBoxContainerReference.children[0].children[0].value =
      position.label;

    this.mapReference.setView(position, 20);

    this.registerMapEvents();
  }

  registerMapEvents() {
    const {
      refs: {
        searchReference: {
          leafletElement: {
            elements: { container: searchBoxContainer },
            map: map,
          },
        },
      },
    } = this;

    DomEvent.on(searchBoxContainer, "click", function (ev) {
      DomEvent.stopPropagation(ev);
    });

    map.on("geosearch/showlocation", this.handleSearch);
    map.on("click", this.handleClick);

    this.searchBoxContainerReference = searchBoxContainer;
    this.mapReference = map;
  }

  render() {
    return (
      <div>
        <MapSearch ref="searchReference" />
        {this.state.currentPosition && (
          <Marker
            position={this.state.currentPosition}
            draggable={true}
            ondragend={this.handleDragAndDrop}
          ></Marker>
        )}
      </div>
    );
  }
}
