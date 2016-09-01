'use strict';

module.exports = function(officeId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/funder_organization_offices/${officeId}/members`,
    response: {
      success: true
    }
  }
};
