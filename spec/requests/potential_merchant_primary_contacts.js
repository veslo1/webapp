'use strict';

module.exports = function(users) {
  users = users || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/merchants/potential_primary_contacts',
    response: {
      data: users
    }
  };
};
