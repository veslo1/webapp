'use strict';

module.exports = function(memberId, members) {
  members = members || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_office_members/${memberId}/potential_parent_members`,
    response: {
      data: members
    }
  };
};
