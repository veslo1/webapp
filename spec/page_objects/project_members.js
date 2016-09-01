'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/members/index`,

    activeSectionsTab: element(by.css('.project-tabs li.active')),

    funderInfo: element(by.css('.funder-info')),
    ownerInfo: element(by.css('.owner-info')),

    funder: function() {
      return {
        fullName: this.funderInfo.element(by.css('.user-full-name')),
        email: this.funderInfo.element(by.css('.user-email')),
      };
    },

    owner: function() {
      return {
        fullName: this.ownerInfo.element(by.css('.user-full-name')),
        email: this.ownerInfo.element(by.css('.user-email')),
      };
    },

    serviceProviders: element.all(by.css('.service-providers .user')),

    addOwnerButton: element(by.css('.add-owner-button')),
    addFunderButton: element(by.css('.add-funder-button')),
    addServiceProviderButton: element(by.css('.add-service-provider-button')),
  }, base);
}
