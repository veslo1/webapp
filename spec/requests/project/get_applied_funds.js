'use strict';

module.exports = function(projectId, funds) {
  funds = funds || {
    material_funds: '123123.45',
    labor_funds: '223123.45',
    overhead_funds: '323123.45',
    profit_funds: '423123.45'
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/applied_funds`,
    response: {
      funds: funds
    }
  };
};
