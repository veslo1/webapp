'use strict';

describe('Service: ProjectAppliedFunds', function () {
  var httpBackend;

  // load the service's module
  beforeEach(module('buildpayApp'));

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  var projectId = 35;
  var url = 'http://localhost:3000/projects/35/applied_funds';
  var getFundsResponse = {
    material_funds: '123',
    labor_funds: '456',
    overhead_funds: '789',
    profit_funds: '999' };
  var updateFundsResponse = { success: true };
  var fundsParam = { some_funds: 'stuff' };

  // instantiate service
  var ProjectAppliedFunds;
  beforeEach(inject(function (_ProjectAppliedFunds_, $httpBackend) {
    ProjectAppliedFunds = _ProjectAppliedFunds_;
    httpBackend = $httpBackend;

    httpBackend.when('PUT', url, { funds: fundsParam }).respond(updateFundsResponse);
    httpBackend.when('GET', url).respond(getFundsResponse);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getFunds', function() {
    it('returns expected response', function () {
      ProjectAppliedFunds.getFunds(projectId).then(function(response) {
        expect(response.data).toEqual(getFundsResponse);
      });
      httpBackend.flush();
    });
  });

  describe('updateFunds', function() {
    it('returns expected response', function () {
      ProjectAppliedFunds.updateFunds(projectId, fundsParam).then(function(response) {
        expect(response.data).toEqual(updateFundsResponse);
      });
      httpBackend.flush();
    });
  });

});
