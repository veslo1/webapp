'use strict';

module.exports = function(projectId, users) {
  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/committed_funds/potential_receivers`,
    response: {
      users: users
    }
  };
};
