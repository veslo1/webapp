'use strict';

module.exports = function(officeId, members) {
  members = members || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_offices/${officeId}/members`,
    response: {
      data: members
    }
  };
};
