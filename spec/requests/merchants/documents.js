'use strict';

module.exports = function(merchantId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/merchants/${merchantId}/documents`,
    response: {
      success: true
    }
  };
};
