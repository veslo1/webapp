'use strict';

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: [
    //'spec/*_spec.js',
    'app/es6/**/*.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },

  chromeDriver: '/usr/local/bin/chromedriver',
  directConnect: (process.env.dc !== 'false'),

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000',

  onPrepare: function() {
    var disableNgAnimate = function() {
      angular
      .module('disableNgAnimate', [])
      .run(['$animate', function($animate) {
        $animate.enabled(false);
      }]);
    };

    var disableCssAnimate = function() {
      angular
      .module('disableCssAnimate', [])
      .run(function() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '* {' +
          '-webkit-transition: none !important;' +
          '-moz-transition: none !important' +
          '-o-transition: none !important' +
          '-ms-transition: none !important' +
          'transition: none !important' +
          '}';
        document.getElementsByTagName('head')[0].appendChild(style);
      });
    };

    var disableMessages = function() {
      angular.module('disableMessages', [])
      .config(function(informProvider) {
        var myDefaults = {
          ttl: 0,
        };

        informProvider.defaults(myDefaults);
      });
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('disableCssAnimate', disableCssAnimate);
    browser.addMockModule('disableMessages', disableMessages);
  },

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 7000
  }
};
