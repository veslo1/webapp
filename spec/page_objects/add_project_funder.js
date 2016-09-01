'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/members/add_funder`,
    h4Title: element(by.css('h4')),
    potentialFunders: element.all(by.repeater('userRecord in users')),
    potentialFunderByIndex: function(index) {
      var funder = this.potentialFunders.get(index);

      return {
        fullName: funder.element(by.css('.user-full-name')),
        email: funder.element(by.css('.user-email')),
        addButton: funder.element(by.css('.add-user-button'))
      };
    },
    activeSectionsTab: element(by.css('.project-tabs li.active')),
  }, base);
};
