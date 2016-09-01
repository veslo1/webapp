'use strict';

var HttpBackend = require('http-backend-proxy');

module.exports = function(browser) {
  var self = this;

  self.browser = browser;
  self.proxy = new HttpBackend(browser);
  self.backend = self.proxy.onLoad;

  self.reset = function() {
    self.backend.reset();
  };

  self.sync = function() {
    //self.backend.sync();
  };

  self.teardown = function() {
    self.reset();
    //self.proxy.flush();
    //self.backend.clear();

    self.browser.manage().logs().get('browser').then(function(browserLog) {
      var severeWarnings = [];

      for(var i = 0; i < browserLog.length; i++) {
        var logMessage = browserLog[i];

        if (logMessage.level.name === 'SEVERE') {
          severeWarnings.push(logMessage);
        }
      }

      expect(severeWarnings.length).toEqual(0, require('util').inspect(severeWarnings));
    });
  };

  self.stubRequest = function(req) {
    if (req.method === 'GET') {
      if (typeof req.response === 'function') {
        self.backend.whenGET(req.url).respond(req.response);
      } else {
        self.backend.whenGET(req.url).respond(200, req.response);
      }
    } else if (req.method === 'POST') {
      if (typeof req.response === 'function') {
        self.backend.whenPOST(req.url).respond(req.response);
      } else {
        self.backend.whenPOST(req.url).respond(201, req.response);
      }
    } else if (req.method === 'PUT') {
      if (typeof req.response === 'function') {
        self.backend.whenPUT(req.url).respond(req.response);
      } else {
        self.backend.whenPUT(req.url).respond(200, req.response);
      }
    };
  };

  self.stubDefaults = function() {
    self.stubNonApiRequests();
    self.stubDefaultResponse();
  };

  self.stubNonApiRequests = function() {
    self.backend.whenGET(/^(?!http:\/\/localhost:3000).*/).passThrough();
  };

  self.stubDefaultResponse = function() {
    self.backend.whenGET(/.*/).respond(function(method, url, data, headers) {
      var req = { method: method, url: url, data: data, headers: headers };

      throw new Error('Request not stubbed - ' + JSON.stringify(req));

      return [ 500, { errors: [ 'Request Not Stubbed!' ] }, {}];
    });
  };
};
