import Geocode from 'react-geocode';

import { MAP_KEY } from '../../config/credentials';

// geocode configs
Geocode.setApiKey(MAP_KEY);
Geocode.setLanguage('en');

// Credit to https://www.w3.org/2003/01/geo/test/ustowns/latlong.htm for this data
const defaultCentersMap = {
  'San Francisco': {
    lat: 37.75,
    lng: 122.68
  },
  'New York City': {
    lat: 40.77,
    lng: 73.98
  },
  'Los Angeles': {
    lat: 33.93,
    lng: 118.40
  }
};

// TODO: (Post-demo) return an error instead of SF in the error case
export const getDefaultCenter = (cityString) => {
  if (!!defaultCentersMap[cityString]) {
    return defaultCentersMap[cityString]
  } else {
    return defaultCentersMap['San Francisco'];
  }
};

/**
 * getBrowserLocation - get's the user's location from the browser navigator API
 * @returns {Promise} promise to a geoLocation object {lat, lng}, geoLocation.error will be truthy if an error occurred
 */
export const getBrowserLocation = () => {
  const geoLocation = {};
  if (!navigator.geolocation) {
    geoLocation.error = 'User has denied access to the location in their browser';
  } else {
    navigator.geolocation.getCurrentPosition(
      position => {
        geoLocation.lat = position.coords.latitude;
        geoLocation.lng = position.coords.longitude;
      },
      error => { geoLocation.error = error; }
    );
  }
  return geoLocation;
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

