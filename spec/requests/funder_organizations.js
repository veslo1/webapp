'use strict';

module.exports = function(funder_organizations) {
  funder_organizations = funder_organizations || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/funder_organizations',
    response: {
      data: funder_organizations
    }
  };
};
