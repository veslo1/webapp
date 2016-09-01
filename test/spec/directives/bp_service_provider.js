'use strict';

describe('Directive: bpServiceProvider', function () {

  // load the directive's module
  beforeEach(module('buildpayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bp-service-provider></bp-service-provider>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the bpServiceProvider directive');
  }));
});
