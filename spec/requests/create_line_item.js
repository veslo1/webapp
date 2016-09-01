'use strict';

module.exports = function(transactionId) {
  return {
    method: 'POST',
    url: 'http://localhost:3000/transactions/' + transactionId + '/line_items',
    response: {
      success: true
    }
  }
};
