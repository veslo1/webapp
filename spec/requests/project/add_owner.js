module.exports = function(projectId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/projects/${projectId}/owner`,
    response: {
      success: true
    }
  };
}
