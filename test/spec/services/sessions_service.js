'use strict';

describe('Service: Sessions', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  var httpBackend;

  var user = {
    id: 4,
    first_name: 'first name',
    last_name: 'last name',
    email: 'some@example.com'
  };

  var createResponse = {
    user: user
  };

  var destroyResponse = {
    success: true
  };

  var userParams = {
    email: 'something',
    password: 'password123'
  };

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  var Sessions;
  beforeEach(inject(function (_Sessions_, $httpBackend) {
    Sessions = _Sessions_;
    httpBackend = $httpBackend;

    httpBackend.when('POST', 'http://localhost:3000/sessions').respond(createResponse);
    httpBackend.when('DELETE', 'http://localhost:3000/sessions').respond(destroyResponse);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('createUser', function() {
    it('creates user using api', function() {
      httpBackend.expectPOST('http://localhost:3000/sessions', userParams);
      Sessions.create(userParams);
      httpBackend.flush();
    });
  });

  describe('destroy', function() {
    it('creates user using api', function() {
      httpBackend.expectDELETE('http://localhost:3000/sessions');
      Sessions.destroy();
      httpBackend.flush();
    });
  });
});
