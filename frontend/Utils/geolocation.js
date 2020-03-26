export const getBrowserLocation = () => {
  if (!navigator.geolocation) {
    return "User has denied access to the location in their browser"
  } else {
    return navigator.geolocation.getCurrentPosition(
      position => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      error => { return error; }
    );
  }
};