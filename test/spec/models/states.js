'use strict';

describe('Service: States', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  // instantiate service
  var States;
  beforeEach(inject(function (_States_) {
    States = _States_;
  }));

  it('should do something', function () {
    expect(!!States).toBe(true);
  });

});
