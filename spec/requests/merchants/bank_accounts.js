'use strict';

module.exports = function(merchantId, bankAccounts) {
  bankAccounts = bankAccounts || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/merchants/${merchantId}/bank_accounts`,
    response: {
      data: bankAccounts
    }
  };
};
