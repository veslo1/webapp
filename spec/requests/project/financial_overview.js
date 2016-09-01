'use strict';

module.exports = function(projectId, funds) {
  funds = funds || {
    material_funds: {
      budgeted: 0,
      allocated: 0,
      spent: 0
    },
    labor_funds: {
      budgeted: 0,
      allocated: 0,
      spent: 0
    }
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/financial_overview`,
    response: {
      totals: funds
    }
  };
};
