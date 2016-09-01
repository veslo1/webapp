'use strict';

module.exports = function(passwordResetHash) {
  return {
    method: 'PUT',
    url: 'http://localhost:3000/password_resets/' + passwordResetHash,
    data: {
      hash_id: 'abc123',
      new_password: ''
    },
    response: {
      success: true
    }
  }
};
