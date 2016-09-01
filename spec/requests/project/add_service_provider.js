module.exports = function(projectId, projectMember) {
  return {
    method: 'POST',
    url: `http://localhost:3000/projects/${projectId}/service_providers`,
    response: { data: projectMember }
  };
}
