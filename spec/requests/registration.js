'use strict';

module.exports = function() {
  return {
    method: 'POST',
    url: 'http://localhost:3000/registrations',
    response: function(method, url, data, headers) {
      var parsedData = JSON.parse(data);
      if (parsedData.user.password === 'Password123!') {
        return [201, {
          success: true,
          user: {
            id: 1,
            email: 'jerry.lewis@example.com',
            first_name: 'Jerry',
            last_name: 'Lewis'
          },
          auth_token: 'someauthtoken'
        }, {} ]
      } else {
        return [422, {
          success: false,
          errors: {
            base: ["User already active in system"]
          }
        }, {} ]
      }
    }
  };
};
