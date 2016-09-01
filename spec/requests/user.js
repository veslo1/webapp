'use strict';

module.exports = function(user, permissions) {
  permissions = permissions || {};

  return {
    method: 'GET',
    url: 'http://localhost:3000/users/' + user.id,
    response: {
      user: user,
      permissions: permissions
    }
  };
};
