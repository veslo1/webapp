'use strict';

module.exports = function(projectId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/projects/${projectId}/payout_request`,
    response: {
      success: true
    }
  };
};
