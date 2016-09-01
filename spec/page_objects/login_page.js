'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/login',
  email: element(by.model('login.user.email')),
  password: element(by.model('login.user.password')),
  forgotPasswordLink: element(by.css('.forgot-password-link'))
}, base);
