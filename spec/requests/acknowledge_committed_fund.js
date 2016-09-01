'use strict';

module.exports = function(fundId) {
  return {
    method: 'PUT',
    url: 'http://localhost:3000/committed_funds/' + fundId + '/acknowledgements',
    response: {
      success: true
    }
  };
}
