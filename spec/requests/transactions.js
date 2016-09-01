'use strict';

module.exports = function(transactions) {
  transactions = transactions || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/transactions',
    response: {
      transactions: transactions
    }
  };
};
