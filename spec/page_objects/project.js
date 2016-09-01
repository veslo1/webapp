'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/overview/index`,
    notificationsTitle: element(by.css('.notifications-title')),
    notificationsEvents: element.all(by.repeater('notification in $ctrl.notifications')),
    claimNumber: element(by.css('.project-claim-number')),
    city: element(by.css('.project-city')),
    state: element(by.css('.project-state')),
    postalCode: element(by.css('.project-postal-code')),
    address1: element(by.css('.project-address-1')),
    address2: element(by.css('.project-address-2')),
    description: element(by.css('.project-description')),
    comments: element(by.css('.project-comments')),
    status: element(by.css('.project-status')),
    bankAccountName: element(by.css('.project-bank-account-name')),
    setProjectBankAccountLink: element(by.css('.set-project-bank-account-link')),

    projectStartErrors: element(by.css('.prevalidation-errors')),

    activeSectionsTab: element(by.css('.project-tabs li.active')),

    tabs: {
      overviewLink: element(by.css('#project-overview-tab-link')),
      membersLink: element(by.css('#project-members-tab-link')),
      fundsLink: element(by.css('#project-funds-tab-link')),
      materialsLink: element(by.css('#project-materials-tab-link')),
      laborLink: element(by.css('#project-labor-tab-link'))
    },

    startProjectButton: element(by.css('.start-project-button')),
    editProjectButton: element(by.css('.edit-project-button')),

    fundsSection: {
      budgeted: {
        total: element(by.css('.budgeted-total')),
        material: element(by.css('.budgeted-material')),
        labor: element(by.css('.budgeted-labor'))
      },
      allocated: {
        total: element(by.css('.allocated-total')),
        material: element(by.css('.allocated-material')),
        labor: element(by.css('.allocated-labor'))
      },
      spent: {
        total: element(by.css('.spent-total')),
        material: element(by.css('.spent-material')),
        labor: element(by.css('.spent-labor'))
      },
      savings: {
        total: element(by.css('.savings-total'))
      }
    }
  }, base);
};
