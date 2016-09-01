'use strict';

describe('Service: TokenInterceptor', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  var currentUser;

  var config = {
    headers: {},
    someOption: 'something'
  };

  var authToken = 'asdsdf.asdlsdf.lkajsd';

  var authHeader = 'Bearer ' + authToken;

  var configWithAuthToken = {
    headers: {
      Authorization: authHeader
    },
    someOption: 'something'
  };

  // instantiate service
  var TokenInterceptor;
  beforeEach(inject(function (_TokenInterceptor_, _currentUser_) {
    TokenInterceptor = _TokenInterceptor_;
    currentUser = _currentUser_;
  }));

  describe('request', function() {
    describe('no auth token', function() {
      it('does not add token', function () {
        expect(TokenInterceptor.request(config)).toEqual(config);
      });
    });

    describe('auth token set', function() {
      beforeEach(function() {
        currentUser.login({ user: {}, auth_token: authToken });
      });

      afterEach(function() {
        currentUser.logout();
      });

      it('adds auth token', function () {
        expect(TokenInterceptor.request(config)).toEqual(configWithAuthToken);
      });
    });
  });
});
