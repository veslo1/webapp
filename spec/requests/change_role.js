'use strict';

module.exports = function(userId, response) {
  response = response || {};

  return {
    method: 'PUT',
    url: `http://localhost:3000/users/${userId}/role`,
    response: response
  };
};
