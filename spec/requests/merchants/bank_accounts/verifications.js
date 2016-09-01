'use strict';

module.exports = function(merchantId, bankAccountId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/merchants/${merchantId}/bank_accounts/${bankAccountId}/verifications`,
    response: { success: true }
  };
};
