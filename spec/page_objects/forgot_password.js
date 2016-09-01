'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/forgot_password',
  email: element(by.model('$ctrl.user.email')),
}, base);
