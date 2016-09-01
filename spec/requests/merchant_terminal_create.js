'use strict';

module.exports = function(merchantLocationId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/merchant_locations/${merchantLocationId}/merchant_terminals`,
    response: {
      success: true
    }
  }
};
