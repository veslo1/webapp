module.exports = function(projectId) {
  return {
    method: 'POST',
    url: `http://localhost:3000/projects/${projectId}/material_commitments`,
    response: {
      success: true
    }
  };
}
