'use strict';

describe('Service: Registrations', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

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

  var userParams = {
    first_name: 'something',
    last_name: 'something',
    email: 'something'
  };

  var inviteHashId = 'some-invite-hash-id';

  var Registrations;
  beforeEach(inject(function (_Registrations_, $httpBackend) {
    Registrations = _Registrations_;
    httpBackend = $httpBackend;

    httpBackend.when('POST', 'http://localhost:3000/registrations').respond(createResponse);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('createUser', function() {
    it('creates user using api', function() {
      httpBackend.expectPOST('http://localhost:3000/registrations', { user: userParams, invite_hash_id: inviteHashId });
      Registrations.createUser(userParams, inviteHashId);
      httpBackend.flush();
    });
  });
});
