'use strict';

module.exports = {
  requireSpecHelper: function() {
    return require('./spec_helper');
  },
  specHelper: function(page) {
    var SpecHelper = this.requireSpecHelper();
    return new SpecHelper(page);
  },
  requireSpecFile: function(filename) {
    return require('../' + filename);
  },
  page: function(filename) {
    return this.requireSpecFile('page_objects/' + filename);
  },
  request: function(filename) {
    return this.requireSpecFile('requests/' + filename);
  },
  helper: function(filename) {
    return this.requireSpecFile('support/helpers/' + filename);
  },
  generator: function(filename) {
    return this.helper(filename + '_generator');
  },
  generators: function() {
    return this.helper('generators');
  }
}
