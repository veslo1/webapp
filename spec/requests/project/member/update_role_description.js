'use strict';

module.exports = function(projectId, memberId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/projects/${projectId}/members/${memberId}/role_description`,
    response: {
      success: true
    }
  };
}
