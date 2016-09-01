'use strict';

module.exports = function(projectId, overview) {
  overview = overview || {
    available_to_commit_or_request: 123.51
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/labor_funds_overview`,
    response: {
      data: overview
    }
  };
};
