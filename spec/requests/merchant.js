'use strict';

module.exports = function(merchant) {
  return {
    method: 'GET',
    url: `http://localhost:3000/merchants/${merchant.id}`,
    response: {
      data: merchant
    }
  };
};
