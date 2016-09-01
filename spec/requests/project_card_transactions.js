'use strict';

module.exports = function(projectId, card_transactions) {
  card_transactions = card_transactions || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/card_transactions`,
    response: {
      card_transactions: card_transactions
    }
  };
};
