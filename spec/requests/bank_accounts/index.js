'use strict';

module.exports = function(bankAccounts) {
  bankAccounts = bankAccounts || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/bank_accounts',
    response: {
      data: bankAccounts
    }
  };
}
