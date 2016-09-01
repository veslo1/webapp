'use strict';

module.exports = function(officeMember) {
  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_office_members/${officeMember.id}`,
    response: {
      data: officeMember
    }
  };
};
