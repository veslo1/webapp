'use strict';

describe('Directive: bpProjectOverview', function () {

  // load the directive's module
  beforeEach(module('buildpayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bp-project-overview></bp-project-overview>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the bpProjectOverview directive');
  }));
});
