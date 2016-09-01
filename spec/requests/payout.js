'use strict';

module.exports = function(payout, permissions) {
  permissions = permissions || {};

  return {
    method: 'GET',
    url: `http://localhost:3000/payouts/${payout.id}`,
    response: {
      data: payout,
      permissions: permissions
    }
  };
}
