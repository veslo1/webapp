'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/funders/new',
  name: element(by.model('$ctrl.funderOrg.name')),
  service_fee: element(by.model('$ctrl.funderOrg.service_fee'))
}, base);
