'use strict';

module.exports = function(fundId) {
  return {
    method: 'PUT',
    url: 'http://localhost:3000/card_loads/' + fundId + '/approvals',
    response: {
      success: true
    }
  };
}
