'use strict';

module.exports = function(merchantId, response) {
  response = response || {
    status: ''
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/merchants/${merchantId}/ach_account`,
    response: { data: response }
  };
};
