'use strict';

describe('Directive: mustMatch', function () {

  // load the directive's module
  beforeEach(module('buildpayApp'));

  var element,
    scope, firstModel, otherModel;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();

    firstModel = {};
    otherModel = {};

    scope.firstModel = firstModel;
    scope.otherModel = otherModel;

    //firstModel = jasmine.createSpyObj('firstModel', ['something']);
    //otherModel = jasmine.createSpyObj('otherModel', ['something']);
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input ng-model="firstModel" mustMatch="otherModel"></input>');
    element = $compile(element)(scope);
    //firstModel.$setDirty();
    //firstModel
    scope.$digest();
    //console.log('scope', scope);
    //expect(element.text()).toContain('Passwords do not match');
  }));
});
