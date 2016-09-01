'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/reset_password?hash_id=abc123',
  newPassword: element(by.css('input[name="new_password"]')),
  newPasswordConfirmation: element(by.css('input[name="new_password_confirmation"]')),
}, base);
