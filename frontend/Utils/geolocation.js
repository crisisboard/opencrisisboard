import { OpenStreetMapProvider } from 'leaflet-geosearch';

const MAP_DEFAULT_CENTER_LATITUDE = process.env.REACT_APP_MAP_DEFAULT_CENTER_LATITUDE;
const MAP_DEFAULT_CENTER_LONGITUDE = process.env.REACT_APP_MAP_DEFAULT_CENTER_LATITUDE;

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
    navigator.geolocation.getCurrentPosition(geoLocation => {
      successCallback({
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude
      });
    }, errorCallback);
  }
};

/**
 * getGeolocationFromAddress - uses the leaflet-geosearch npm package to get a geoLocation object from an address string
 * @param {string} address
 * @returns {Object} geoLocation object {lat, lng}, geoLocation.error will be truthy if an error occurred
 */
export const getGeolocationFromAddress = async (address) => {
  const geoLocation = {};

  return await new OpenStreetMapProvider()
  .search({ query: address })
  .then(
    response => {
      console.log( response);
      if (response && response.length > 0) {
        geoLocation.lat = parseFloat(response[0].y);
        geoLocation.lng = parseFloat(response[0].x);
      } else {
        // This case should only be hit if leaflet-geosearch breaks
        geoLocation.error = 'Response from leaflet-geosearch was incorrectly formed'
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

