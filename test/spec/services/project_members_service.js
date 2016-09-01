'use strict';

describe('Service: ProjectMembers', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  // instantiate service
  var ProjectMembers;
  beforeEach(inject(function (_ProjectMembers_) {
    ProjectMembers = _ProjectMembers_;
  }));

  it('should do something', function () {
    expect(!!ProjectMembers).toBe(true);
  });

});
