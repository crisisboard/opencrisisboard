import Geocode from 'react-geocode';

/**
 * getBrowserLocation - get's the user's location from the browser navigator API
 * @returns {Object} geoLocation object {lat, lng}, geoLocation.error will be truthy if an error occurred
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

