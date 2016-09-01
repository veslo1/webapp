'use strict';

module.exports = function(projectId, transaction) {
  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/card_transactions/${transaction.id}/details`,
    response: { card_transaction: transaction }
  };
};
