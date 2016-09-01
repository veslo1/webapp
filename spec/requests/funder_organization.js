'use strict';

module.exports = function(funderOrganization) {
  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organizations/${funderOrganization.id}`,
    response: {
      data: funderOrganization
    }
  };
};
