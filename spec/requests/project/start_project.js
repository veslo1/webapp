'use strict';

module.exports = function(projectId) {
  return {
    method: 'PUT',
    url: 'http://localhost:3000/projects/' + projectId + '/start',
    response: {
      success: true
    }
  }
};
