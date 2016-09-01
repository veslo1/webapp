'use strict';

var httpStubber = require('./http_proxy');

module.exports = function() {
  var self = this;

  self.stubber = new httpStubber(browser);

  self.stubRequests = function(requests) {
    for(var i = 0; i < requests.length; i++) {
      self.stubber.stubRequest(requests[i]);
    };
    self.stubber.stubDefaults();
  };

  self.sync = function() {
    self.stubber.sync();
  };

  self.teardown = function() {
    self.stubber.teardown();
  };

  self.reset = function() {
    self.stubber.reset();
  };
}
