'use strict';

module.exports = function(projectId, payouts) {
  payouts = payouts || []

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/payouts`,
    response: {
      data: payouts
    }
  };
};
