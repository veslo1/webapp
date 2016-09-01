'use strict';

describe('Service: ProjectAppliedFunds', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  // instantiate service
  var ProjectAppliedFunds;
  beforeEach(inject(function (_ProjectAppliedFunds_) {
    ProjectAppliedFunds = _ProjectAppliedFunds_;
  }));

  it('should do something', function () {
    expect(!!ProjectAppliedFunds).toBe(true);
  });

});
