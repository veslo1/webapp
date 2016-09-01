'use strict';

module.exports = function(funderOfficeId, users) {
  users = users || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_offices/${funderOfficeId}/potential_primary_contacts`,
    response: {
      data: users
    }
  };
};
