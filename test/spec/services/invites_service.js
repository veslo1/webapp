'use strict';

describe('Service: Invites', function () {
  var httpBackend;

  // load the service's module
  beforeEach(module('buildpayApp'));

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  // instantiate service
  var Invites;
  beforeEach(inject(function (_Invites_, $httpBackend) {
    Invites = _Invites_;
    httpBackend = $httpBackend;

    httpBackend.whenGET(/http:\/\/localhost:3000\/invites\/check_unique.*/).respond({unique: true});
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('checkUnique', function() {
    describe('key is provided', function() {

      it('returns api result for uniqueness', function() {
        httpBackend.expectGET('http://localhost:3000/invites/check_unique?id=123&prop=propVal', {"Accept": "application/json, text/plain, */*"});

        Invites.checkUnique('123', 'prop', 'propVal').then(function(response) {
          expect(response.data.unique).toEqual(true);
        });
        httpBackend.flush();
      });
    });

    describe('key is NOT provided', function() {
      it('returns api result for uniqueness', function() {
        httpBackend.expectGET('http://localhost:3000/invites/check_unique?prop=propVal', {"Accept": "application/json, text/plain, */*"});

        Invites.checkUnique('', 'prop', 'propVal').then(function(response) {
          expect(response.data.unique).toEqual(true);
        });
        httpBackend.flush();
      });
    });
  });
});
