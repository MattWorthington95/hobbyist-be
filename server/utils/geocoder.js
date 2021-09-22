const openGeocoder = require('node-open-geocoder');

const geocoder = (document) => {
  return new Promise((resolve, reject) => {
    if (!document.location.formattedAddress) {
      const addressStr = `${document.address.firstLine} ${document.address.postcode}`;

      openGeocoder()
        .geocode(addressStr)
        .end((err, res) => {
          if (err) reject(err);
          try {
            if (!res[0]) {
              document.location = {
                type: 'Point',
                coordinates: [],
                formattedAddress: 'None'
              };

              resolve(document.save({ suppressWarning: true }));
            } else if (res[0].display_name) {
              const { lat, lon, display_name } = res[0];

              document.location = {
                type: 'Point',
                coordinates: [lat, lon],
                formattedAddress: display_name
              };

              resolve(document.save({ suppressWarning: true }));
            } else {
              resolve();
            }
          } catch (error) {
            reject(error);
          }
        });
    } else {
      resolve();
    }
  });
};

module.exports = geocoder;
