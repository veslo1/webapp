'use strict';

describe('Service: Project', function () {
  beforeEach(module('buildpayApp'));

  var Project;

  var projectData = {
    id: 123,
    name: 'some project',
    claim_number: 'some claim number',
    status: 'started'
  };

  beforeEach(inject(function (_Project_) {
    Project = _Project_;
  }));

  it('should do something', function () {
    var newProject = new Project(projectData);

    expect(newProject.id).toEqual(projectData.id);
    expect(newProject.name).toEqual(projectData.name);
    expect(newProject.claim_number).toEqual(projectData.claim_number);
    expect(newProject.status).toEqual(projectData.status);
    expect(newProject.statusText()).toEqual('Started');
  });
});
