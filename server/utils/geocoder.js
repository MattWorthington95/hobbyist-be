const openGeocoder = require('node-open-geocoder');

const geocoder = (document) => {
  if (!document.location.formattedAddress) {
    const addressStr = `${document.address.firstLine} ${document.address.postcode}`;
    openGeocoder()
      .geocode(addressStr)
      .end((err, res) => {
        if (err) console.log(err);
        try {
          if (!res[0]) {
            document.location = {
              type: 'Point',
              coordinates: [],
              formattedAddress: 'None'
            };
            document.save();
          } else if (res[0].display_name) {
            const { lat, lon, display_name } = res[0];
            document.location = {
              type: 'Point',
              coordinates: [lat, lon],
              formattedAddress: display_name
            };
            document.save();
          }
        } catch (error) {
          console.log(error);
        }
      });
  }
};

module.exports = geocoder;
