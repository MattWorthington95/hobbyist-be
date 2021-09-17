const openGeocoder = require('node-open-geocoder');

const geocoder = () => {
  openGeocoder()
    .geocode('24 linen court, manchester')
    .end((err, res) => {
      console.log(err, res);
    });
};
geocoder();
