module.exports = function(projectId) {
  return {
    method: 'GET',
    url: 'http://localhost:3000/projects/' + projectId + '/notifications',
    response: {
      notifications: []
    }
  };
};
