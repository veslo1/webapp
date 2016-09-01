'use strict';

module.exports = function(funderOffice) {
  return {
    method: 'GET',
    url: `http://localhost:3000/funder_organization_offices/${funderOffice.id}`,
    response: {
      data: funderOffice
    }
  };
};
