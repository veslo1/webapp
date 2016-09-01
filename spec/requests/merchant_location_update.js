'use strict';

module.exports = function(merchantLocationId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/merchant_locations/${merchantLocationId}`,
    response: {
      success: true
    }
  }
};
