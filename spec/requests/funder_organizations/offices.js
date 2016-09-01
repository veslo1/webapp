'use strict';

module.exports = function(funderOrganizationId, funderOrganizationOffices) {
  funderOrganizationOffices = funderOrganizationOffices || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organizations/${funderOrganizationId}/offices`,
    response: {
      data: funderOrganizationOffices
    }
  };
};
