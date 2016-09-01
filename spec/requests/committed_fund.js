'use strict';

module.exports = function(fund, permissions) {
  permissions = permissions || {};

  return {
    method: 'GET',
    url: 'http://localhost:3000/committed_funds/' + fund.id,
    response: {
      committed_fund: fund,
      permissions: permissions
    }
  };
}
