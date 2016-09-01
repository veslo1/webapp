'use strict';

var _ = require('lodash');
var bpHttpStubber = require('./bp_http_stubber');
var requireHelper = require('./require_helper');
var Generators = requireHelper.helper('generators');

module.exports = function(page) {
  var self = this;

  self.page = page;
  self.stubber = new bpHttpStubber();

  self.requestsToStub = [];

  self.getCountForTest = 0;
  self.onlyGetPageOnce = false;

  self.currentUser;

  self.simulateUserType = null;
  self.systemPermissions = {};

  self.get = function() {
    if (self.onlyGetPageOnce === true) {
      self.onlyGetPageOnce = false;
      self.getCountForTest = 0;
    }

    self.beforeGet();
    self.page.get();

    self.getCountForTest += 1;
  };

  self.getOnce = function() {
    self.onlyGetPageOnce = true;

    if (self.getCountForTest >= 1) {
      return;
    }

    self.beforeGet();
    self.page.get();

    self.getCountForTest += 1;
  };

  self.refresh = function() {
    self.beforeGet();
    self.page.get();

    self.getCountForTest += 1;
  };

  self.beforeGet = function() {
    self.resetRequests();
    // stub requests here right before page get - should help avoid having to reset and stub again
    self.stubber.stubRequests(self.requestsToStub);

    //self.stubber.sync();

    self.stubFakeUser();
  };

  self.stubFakeUser = function() {
    if (self.simulateUserType) {
      var stubUser = Generators.user.newUser({ system_role: self.simulateUserType });
      self.currentUser = stubUser;

      browser.addMockModule('fakeCurrentUser', function(stubUser, systemPermissions) {
        angular.module('fakeCurrentUser', []).run(function(currentUser) {
          localStorage.setItem("ls.authToken", "some.auth.token");
          localStorage.setItem("ls.currentUser", JSON.stringify(stubUser));
          localStorage.setItem("ls.systemPermissions", JSON.stringify(systemPermissions));
          currentUser.setUserProperties();
        });
      }, stubUser, self.systemPermissions);
    }
  };

  self.setSystemPermissions = function(permissions) {
    self.systemPermissions = permissions;
  };

  self.simulateNormalUser = function() {
    self.simulateUserType = 'user';
  };

  self.simulateFunderUser = function() {
    self.simulateUserType = 'funder';
  };

  self.simulateAdminUser = function() {
    self.simulateUserType = 'admin';
  };

  self.resetRequests = function() {
    self.stubber.reset();
  };

  self.stubRequests = function(requests) {
    if (Array.isArray(requests)) {
      _.each(requests, function(request) {
        self.stubRequest(request);
      });
    } else {
      self.stubRequest(requests);
    }
  };

  self.stubRequest = function(request) {
    if (Array.isArray(request)) {
      self.stubRequests(request);
    } else {
      self.requestsToStub.push(request);
    }
  };

  self.teardown = function() {
    self.stubber.teardown();

    if (self.onlyGetPageOnce === true) {
      return;
    }

    self.resetBeforeGet();
    self.resetFakeUserModules();
    self.resetGetCount();
    self.resetSession();
  };

  self.resetFakeUserModules = function() {
    browser.removeMockModule('fakeLogin');
    browser.removeMockModule('fakeCurrentUser');
  };

  self.resetBeforeGet = function() {
    self.actAsLoggedIn = false;
    self.simulateUserType = null;
  };

  self.resetGetCount = function() {
    self.getCountForTest = 0;
  };

  self.currentTest = function() {
    return jasmine.getEnv().currentSpec;
  };

  self.resetGetCount = function() {
    if (self.getCountForTest > 1) {
      console.log('NOTICE: ' + self.getCountForTest + ' page loads for current test');
    } else if(self.getCountForTest === 0) {
      console.log('NOTICE: ' + self.getCountForTest + ' page loads for current test');
    }

    self.getCountForTest = 0;
  };

  self.resetSession = function() {
    browser.executeScript(function() {
      localStorage.clear();
    });
  };

  self.executeScript = function(functionToExecute) {
    browser.executeScript(functionToExecute);
  };
};
