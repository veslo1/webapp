'use strict';

module.exports = function(officeId, bankAccounts) {
  bankAccounts = bankAccounts || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_offices/${officeId}/bank_accounts`,
    response: {
      data: bankAccounts
    }
  };
}
