'use strict';

module.exports = function(projectId, users) {
  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/potential_funders`,
    response: {
      users: users
    }
  };
};
