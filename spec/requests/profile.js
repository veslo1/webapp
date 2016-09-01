'use strict';

module.exports = function(profile) {
  profile = profile || {
    id: 800,
    email: 'chuck.norris@example.com',
    first_name: 'Chuck',
    last_name: 'Norris',
  };

  return {
    method: 'GET',
    url: 'http://localhost:3000/my_profile',
    response: {
      profile: profile
    }
  };
};
