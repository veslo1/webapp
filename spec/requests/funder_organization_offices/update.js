'use strict';

module.exports = function(funderOfficeId, response) {
  response = response || {};
  return {
    method: 'PUT',
    url: `http://localhost:3000/funder_organization_offices/${funderOfficeId}`,
    response: response
  }
};
