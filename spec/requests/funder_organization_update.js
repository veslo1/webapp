'use strict';

module.exports = function(funderOrgId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/funder_organizations/${funderOrgId}`,
    response: {
      success: true
    }
  }
};
