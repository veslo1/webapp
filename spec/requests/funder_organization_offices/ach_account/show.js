'use strict';

module.exports = function(officeId, achAccount) {
  achAccount = achAccount || {};

  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_offices/${officeId}/ach_accounts`,
    response: {
      data: achAccount
    }
  };
};
