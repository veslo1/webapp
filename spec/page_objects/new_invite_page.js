var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/directory/invites/new',
  uniqueErrorMessage: function() {
    return element(by.css('.error span[ng-message=unique]')).getText();
  },
  firstName: element(by.css('input[name="first_name"]')),
  lastName: element(by.css('input[name="last_name"]')),
  email: element(by.css('input[name="email"]')),
}, base);
