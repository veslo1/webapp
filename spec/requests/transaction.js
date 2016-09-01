'use strict';

module.exports = function(transaction) {
  return {
    method: 'GET',
    url: 'http://localhost:3000/transactions/' + transaction.id,
    response: {
      transaction: transaction
    }
  };
};
