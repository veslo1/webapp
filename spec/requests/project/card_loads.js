'use strict';

module.exports = function(projectId, card_loads) {
  card_loads = card_loads || []

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectId}/card_loads`,
    response: {
      data: card_loads
    }
  };
};
