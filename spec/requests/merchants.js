'use strict';

module.exports = function(merchants) {
  merchants = merchants || [];

  return {
    method: 'GET',
    url: 'http://localhost:3000/merchants',
    response: {
      data: merchants
    }
  };
};
