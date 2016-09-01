'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOffice) {
  return _.extend({
    url: `/#/funders/${funderOffice.funder_organization_id}/offices/${funderOffice.id}/members/new`,

    firstName: element(by.css('input[name="first_name"]')),
    lastName: element(by.css('input[name="last_name"]')),
    email: element(by.css('input[name="email"]')),

    parentOfficeMemberDropdown: element(by.css('select[name="parent_office_member_id"]')),
    parentOfficeMemberOption: function(value) {
      return this.parentOfficeMemberDropdown.element(by.cssContainingText('option', value));
    },

    userExistsAlert: element(by.css('.user-exists-alert')),
    inviteMemberConfirmButton: element(by.css('.confirm-invite-member-button')),
    inviteMemberResetButton: element(by.css('.reset-invite-member-button')),
    inviteSubmitButton: element(by.css('.invite-submit-button'))
  }, base);
}
