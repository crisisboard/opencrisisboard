import Geocode from 'react-geocode';


const MAP_KEY = process.env.REACT_APP_MAP_KEY;
const MAP_DEFAULT_CENTER_LATITUDE = process.env.REACT_APP_MAP_DEFAULT_CENTER_LATITUDE;
const MAP_DEFAULT_CENTER_LONGITUDE = process.env.REACT_APP_MAP_DEFAULT_CENTER_LATITUDE;

// geocode configs
Geocode.setApiKey(MAP_KEY);
Geocode.setLanguage('en');

export const getDefaultCenter = () => {
  console.log('default center:', MAP_DEFAULT_CENTER_LATITUDE, MAP_DEFAULT_CENTER_LONGITUDE);
  return {
    lat: MAP_DEFAULT_CENTER_LATITUDE,
    lng: MAP_DEFAULT_CENTER_LONGITUDE
  }
};

/**
 * getBrowserLocation - gets the user location from the browser navigator API and calls a callback
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
  )
  .catch(error => {
    geoLocation.error = error;
    return geoLocation;
  });
};

