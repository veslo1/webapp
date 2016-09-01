'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/members/add_owner`,

    activeSectionsTab: element(by.css('.project-tabs li.active')),

    firstName: element(by.css('input[name="first_name"]')),
    lastName: element(by.css('input[name="last_name"]')),
    email: element(by.css('input[name="email"]')),

    inviteMemberConfirmButton: element(by.css('.confirm-invite-member-button')),
    inviteMemberResetButton: element(by.css('.reset-invite-member-button')),
    inviteSubmitButton: element(by.css('.invite-submit-button'))

  }, base);
}
