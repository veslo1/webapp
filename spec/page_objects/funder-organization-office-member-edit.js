'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrganizationId, officeId, memberId) {
  return _.extend({
    url: `/#/funders/${funderOrganizationId}/offices/${officeId}/members/${memberId}`,
    name: element(by.css('.user-full-name')),
    email: element(by.css('.user-email')),
    canCreateProjectCheckbox: element(by.css('input[name="can_create_projects"]')),
    submitButton: element(by.css("input[type='submit']"))
  }, base);
}
