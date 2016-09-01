'use strict';

module.exports = function(project) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/projects/${project.id}`,
    response: {}
  };
};
