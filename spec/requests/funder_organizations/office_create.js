'use strict';

module.exports = function(funderOrganizationId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/funder_organizations/${funderOrganizationId}/offices`,
    response: {
      success: true
    }
  }
};
