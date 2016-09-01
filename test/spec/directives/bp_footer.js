'use strict';

describe('Directive: bpFooter', function () {
  beforeEach(module('buildpayApp'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bp-footer></bp-footer>');
    element = $compile(element)(scope);
    //scope.$digest();
    //expect(element.text()).toBe('this is the bpFooter directive');
  }));
});
