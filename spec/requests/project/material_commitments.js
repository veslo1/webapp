'use strict';

module.exports = function(projectId, funds) {
  funds = funds || {};

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/material_commitments`,
    response: {
      data: funds
    }
  };
};
