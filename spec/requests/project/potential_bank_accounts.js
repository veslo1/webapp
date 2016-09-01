'use strict';

module.exports = function(projectId, bankAccounts) {
  bankAccounts = bankAccounts || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/potential_bank_accounts`,
    response: {
      data: bankAccounts
    }
  };
}
