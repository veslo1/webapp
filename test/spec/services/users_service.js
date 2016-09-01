'use strict';

describe('Service: Users', function () {
  var httpBackend;

  // load the service's module
  beforeEach(module('buildpayApp'));

  // instantiate service
  var Users;

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function (_Users_, $httpBackend) {
    Users = _Users_;
    httpBackend = $httpBackend;

    httpBackend.when('GET', 'http://localhost:3000/users').respond({});
    httpBackend.when('GET', 'http://localhost:3000/users/500').respond({});
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getUsers', function() {
    it('gets users from api', function() {
      httpBackend.expectGET('http://localhost:3000/users');

      var users = Users.query();
      httpBackend.flush();
      expect(users).toBeDefined();
    });
  });

  describe('getUser', function() {
    it('gets user from api', function() {
      httpBackend.expectGET('http://localhost:3000/users/500');

      var user = Users.getUser(500);
      httpBackend.flush();
      expect(user).toBeDefined();
    });
  });
});
