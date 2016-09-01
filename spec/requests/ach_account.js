'use strict';

module.exports = function(response) {
  response = response || {
    status: ''
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/ach_account`,
    response: { data: response }
  };
};
