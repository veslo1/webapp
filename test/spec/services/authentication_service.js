'use strict';

describe('Service: Authentication', function () {
  beforeEach(module('buildpayApp'));

  var localStorage, Authentication;

  var authToken = 'some token';
  var currentUser = {
    id: 1,
    email: 'test@example.com',
    first_name: 'Test First',
    last_name: 'Test Last'
  };

  beforeEach(inject(function (_Authentication_, localStorageService) {
    localStorage = localStorageService;
    Authentication = _Authentication_;
  }));

  it('should set default values', function() {
    expect(Authentication.isAuthenticated()).toEqual(false);
    expect(Authentication.currentUser()).toEqual(null);
    expect(Authentication.authToken()).toEqual(null);
  });

  describe('auth token is set', function() {
    beforeEach(function() {
      localStorage.set('authToken', authToken);
      localStorage.set('currentUser', currentUser);
    });

    it('sets values to local storage values', function() {
      expect(Authentication.isAuthenticated()).toEqual(true);
      expect(Authentication.currentUser()).toEqual(currentUser);
      expect(Authentication.authToken()).toEqual(authToken);
    });
  });

  describe('setAuthData', function() {
    var authData = {
      user: currentUser,
      auth_token: authToken
    };

    it('sets current user and auth token', function() {
      Authentication.setAuthData(authData);

      expect(Authentication.authToken()).toEqual(authToken);
      expect(Authentication.currentUser()).toEqual(currentUser);
      expect(Authentication.isAuthenticated()).toEqual(true);
      expect(localStorage.get('currentUser')).toEqual(currentUser);
      expect(localStorage.get('authToken')).toEqual(authToken);
    });
  });

  describe('resetAuthData', function() {
    beforeEach(function() {
      localStorage.set('authToken', authToken);
      localStorage.set('currentUser', currentUser);
    });

    it('resets local storage and service variables', function() {
      expect(Authentication.isAuthenticated()).toEqual(true);
      expect(Authentication.currentUser()).toEqual(currentUser);
      expect(Authentication.authToken()).toEqual(authToken);

      Authentication.resetAuthData();

      expect(Authentication.isAuthenticated()).toEqual(false);
      expect(Authentication.currentUser()).toEqual(null);
      expect(Authentication.authToken()).toEqual(null);
      expect(localStorage.get('currentUser')).toEqual(null);
      expect(localStorage.get('authToken')).toEqual(null);
    });
  });
});
