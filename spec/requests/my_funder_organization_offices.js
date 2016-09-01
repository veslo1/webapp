'use strict';

module.exports = function(funder_organization_offices) {
  funder_organization_offices = funder_organization_offices || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/my_funder_organization_offices',
    response: {
      data: funder_organization_offices
    }
  };
};
