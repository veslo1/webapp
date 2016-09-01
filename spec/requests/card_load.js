'use strict';

module.exports = function(card_load, permissions) {
  permissions = permissions || {};

  return {
    method: 'GET',
    url: 'http://localhost:3000/card_loads/' + card_load.id,
    response: {
      card_load: card_load,
      permissions: permissions
    }
  };
}
