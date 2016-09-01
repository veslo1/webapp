'use strict';

module.exports = function(projectId, members) {
  members = members || {
    funder: null,
    owner: null,
    service_providers: []
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/members`,
    response: {
      members: members
    }
  };
};
