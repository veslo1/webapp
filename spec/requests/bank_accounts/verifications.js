'use strict';

module.exports = function(bankAccountId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/bank_accounts/${bankAccountId}/verifications`,
    response: { success: true }
  };
};
