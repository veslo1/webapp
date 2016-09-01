'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(userId) {
  return  _.extend({
    url: '/#/directory/users/' + userId,
    email: element(by.css('.user-email')),
    registeredAt: element(by.css('.user-registered-at')),
    createdAt: element(by.css('.user-created-at')),
    status: element(by.css('.user-status')),
    roleText: element(by.css('.user-role')),
    roleDropdown: element(by.name('role_name')),
    roleDropdownOption: function(option) {
      return this.roleDropdown.element(by.cssContainingText('option', option));
    },
    applyRoleButton: element(by.css('.apply-role')),
    roleErrorMessages: element(by.css('field-errors')),
    resendInviteButton: element(by.css('.resend-invite-button'))

  }, base);
}
