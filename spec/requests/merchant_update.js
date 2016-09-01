'use strict';

module.exports = function(merchantId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/merchants/${merchantId}`,
    response: {
      success: true
    }
  }
};
