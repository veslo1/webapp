'use strict';

module.exports = function(project) {
  return {
    method: 'GET',
    url: 'http://localhost:3000/projects/' + project.id,
    response: {
      project: project
    }
  };
};
