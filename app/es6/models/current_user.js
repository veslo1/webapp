'use strict';

import SystemPermissions from './../models/system_permissions';

export default function(Authentication) {
  "ngInject";

  var self = this;

  self.Authentication = Authentication;

  self.isAuthenticated = false;
  self.authToken = null;
  self.keys = [];
  self.permissions = new SystemPermissions();

  self.getUser = function(data) {
    if (data && data.user) {
      return data.user;
    } else {
      return self.Authentication.currentUser();
    }
  };

  self.getAuthToken = function(data) {
    if (data && data.auth_token) {
      return data.auth_token;
    } else {
      return self.Authentication.authToken();
    }
  };

  self.getPermissions = function(data) {
    if (data && data.permissions) {
      return data.permissions;
    } else {
      return self.Authentication.permissions();
    }
  };

  self.setUserProperties = function(data) {
    var user = self.getUser(data);
    self.keys = [];
    angular.forEach(user, (value, key) => {
      self.keys.push(key);
      self[key] = value;
    });

    var authToken = self.getAuthToken(data);
    self.isAuthenticated = !!authToken;
    self.authToken = authToken;

    var permissionsData = self.getPermissions(data);
    self.permissions = new SystemPermissions(permissionsData);
  };

  self.setUserProperties();

  self.clearProperties = function() {
    angular.forEach(self.keys, (key) => {
      self[key] = null;
    });
    self.isAuthenticated = false;
    self.authToken = null;
    self.permissions = new SystemPermissions();
  };

  self.isServiceProvider = function() {
    return self.system_role === 'user';
  };

  self.login = function(data) {
    self.Authentication.setAuthData(data);
    self.setUserProperties(data);
  };

  self.logout = function() {
    self.Authentication.resetAuthData();
    self.clearProperties();
  };
}
