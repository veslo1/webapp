'use strict';

module.exports = function(merchantId, merchantLocations) {
  merchantLocations = merchantLocations || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/merchants/${merchantId}/merchant_locations`,
    response: {
      data: merchantLocations
    }
  };
};
