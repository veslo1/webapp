'use strict';

module.exports = function(fundId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/payouts/${fundId}/acknowledgements`,
    response: {
      success: true
    }
  };
}
