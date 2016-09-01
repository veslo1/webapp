module.exports = function(projectId) {
  return {
    method: 'PUT',
    url: `http://localhost:3000/projects/${projectId}/bank_account`,
    response: {
      success: true
    }
  };
}
