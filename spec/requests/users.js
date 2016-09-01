'use strict';

module.exports = function(users) {
  users = users || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/users',
    response: {
      users: users
    }
  };
};
