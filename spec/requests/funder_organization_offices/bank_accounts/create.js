'use strict';

module.exports = function(funderOfficeId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/funder_organization_offices/${funderOfficeId}/bank_accounts`,
    response: { success: true }
  };
};
