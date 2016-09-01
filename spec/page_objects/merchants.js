'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/merchants',

  merchants: element.all(by.css('.merchants .merchant')),

  merchantByIndex: function(index) {
    var row = this.merchants.get(index);

    return {
      name: row.element(by.css('.merchant-name')),
      nameLink: row.element(by.css('.merchant-name a')),
      location: row.element(by.css('.merchant-location')),
      primaryContact: row.element(by.css('.merchant-primary-contact')),
    };
  },

  newMerchantButton: element(by.css('.new-merchant-button'))

}, base);
