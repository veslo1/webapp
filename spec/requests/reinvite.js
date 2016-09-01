'use strict';

module.exports = function(userId) {
  return {
    method: 'POST',
    url: 'http://localhost:3000/users/' + userId + '/reinvites',
    response: {
      success: true
    }
  };
}
