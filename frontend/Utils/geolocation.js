import Geocode from 'react-geocode';

import {
  MAP_KEY,
  MAP_DEFAULT_CENTER
} from '../../config/credentials';

import _ from 'lodash';

// geocode configs
Geocode.setApiKey(MAP_KEY);
Geocode.setLanguage('en');

// Credit to https://www.w3.org/2003/01/geo/test/ustowns/latlong.htm for this data
const defaultCentersMap = {
  'SanFrancisco': {
    lat: 37.7749,
    lng: -122.4194
  },
  'NewYorkCity': {
    lat: 40.77,
    lng: -73.98
  },
  'LosAngeles': {
    lat: 33.93,
    lng: -118.40
  }
};


export const getDefaultCenter = () => {
  if (defaultCentersMap[MAP_DEFAULT_CENTER]) {
    return defaultCentersMap[MAP_DEFAULT_CENTER];
  } else {
    return defaultCentersMap['SanFrancisco'];
  }
};

/**
 * getBrowserLocation - get's the user's location from the browser navigator API
 * @params successCallback, errorCallback
 * @returns {void}
 */
export const getBrowserLocation = (successCallback, errorCallback) => {
  if (!navigator.geolocation) {
    errorCallback('User has denied access to the location in their browser');
  } else {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
};

/**
 * getGeolocationFromAddress - uses the react-geocode npm package to get a geoLocation object from an address string
 * @param {string} address
 * @returns {Object} geoLocation object {lat, lng}, geoLocation.error will be truthy if an error occurred
 */
export const getGeolocationFromAddress = (address) => {
  const geoLocation = {};
  return Geocode.fromAddress(address)
  .then(
    response => {
      if (response && response.results && response.results.length > 0) {
        geoLocation.lat = response.results[0].geometry.location.lat;
        geoLocation.lng = response.results[0].geometry.location.lng;
      } else {
        // This case should only be hit if react-geocode breaks
        geoLocation.error = 'Response from react-geocode was incorrectly formed'
      }
      return geoLocation;
    },
    error => {
      geoLocation.error = error;
      return geoLocation;
    }
  );
};

