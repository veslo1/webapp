'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId, memberId) {
  return _.extend({
    url: `/#/projects/${projectId}/members/${memberId}/overview`,

    email: element(by.css('.user-email')),
    registeredAt: element(by.css('.user-registered-at')),
    createdAt: element(by.css('.user-created-at')),
    status: element(by.css('.user-status')),

    roleDescriptionSpan: element(by.css('.role-description')),
    roleDescriptionInput: element(by.model('$ctrl.member.role_description')),
    applyRoleDescriptionButton: element(by.css('.apply-role-description-button')),
    roleErrorMessages: element(by.css('.role-error-messages')),

    bankAccountNameSpan: element(by.css('.project-bank-account-name')),
    changeBankAccountButton: element(by.css('.set-project-bank-account-link')),

    cardRequestedRow: element(by.css('.card-requested-row')),
    cardRequestedText: element(by.css('.card-requested-text')),
    requestCardButton: element(by.css('.request-card-button')),

    cardErrorMessagesText: element(by.css('.card-error-messages')),

    cardIssuedRow: element(by.css('.card-issued-row')),
    cardIssuedText: element(by.css('.card-issued-text')),

    addCardNumberButton: element(by.css('.add-card-number-button'))

  }, base);
};
