'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/funders',

  funderOrgs: element.all(by.css('.funder-orgs .funder-org')),

  funderOrgByIndex: function(index) {
    var row = this.funderOrgs.get(index);

    return {
      name: row.element(by.css('.funder-org-name')),
      nameLink: row.element(by.css('.funder-org-name a')),
      headquarters: row.element(by.css('.funder-org-headquarters'))
    };
  },

  newFunderButton: element(by.css('.new-funder-org-button'))

}, base);
