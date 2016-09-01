'use strict';

module.exports = function(projectId, memberId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/projects/${projectId}/members/${memberId}/transactions`,
    response: {
      success: true
    }
  }
};
