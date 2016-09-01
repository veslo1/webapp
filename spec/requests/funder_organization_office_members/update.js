'use strict';

module.exports = function(officeMemberId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/funder_organization_office_members/${officeMemberId}`,
    response: {}
  };
};
