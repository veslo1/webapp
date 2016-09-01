'use strict';

module.exports = function(projects) {
  projects = projects || [];

  return {
    method: 'GET',
    url: "http://localhost:3000/projects",
    response: {
      projects: projects
    }
  }
};
