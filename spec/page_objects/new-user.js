var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/signup?invite_id=' + this.inviteId,
  inviteId: '2a2db2e9-1e17-44a8-8e27-dcf107480ecf',

  email: element(by.css('.invite-email')),
  firstName: element(by.css('input[name="first_name"]')),
  lastName: element(by.css('input[name="last_name"]')),
  homeMobilePhone: element(by.css('input[name="home_mobile_phone"]')),
  password: element(by.css('input[name="password"]')),
  passwordConfirmation: element(by.css('input[name="password_confirmation"]')),
  termsCheckbox: element(by.model('$ctrl.user.tos_agreement')),

  formContent: element(by.css('form')),
}, base);
