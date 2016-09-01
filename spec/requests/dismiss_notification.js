'use strict';

module.exports = function(notificationId) {
  return {
    method: 'PUT',
    url: 'http://localhost:3000/notifications/' + notificationId + '/dismiss',
    response: {
      success: true
    }
  };
}
