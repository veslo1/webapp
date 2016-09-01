'use strict';

module.exports = function(merchantLocation) {
  return {
    method: 'GET',
    url: `http://localhost:3000/merchant_locations/${merchantLocation.id}`,
    response: {
      data: merchantLocation
    }
  };
};
