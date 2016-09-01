'use strict';

module.exports = function(projectId, total) {
  total = total || 0.0;

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/card_transactions/total`,
    response: {
      card_transactions: { total: total }
    }
  };
};
