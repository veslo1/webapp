'use strict';

module.exports = function(merchantLocationId, terminals) {
  terminals = terminals || [];

  return {
    method: 'GET',
    url: `http://localhost:3000/merchant_locations/${merchantLocationId}/merchant_terminals`,
    response: {
      data: terminals
    }
  };
};
