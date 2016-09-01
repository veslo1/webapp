'use strict';

module.exports = function(officeId, bankAccountId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/funder_organization_offices/${officeId}/bank_accounts/${bankAccountId}/verifications`,
    response: {}
  };
};
