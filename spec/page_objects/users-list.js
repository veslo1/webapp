'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/directory/users',
  newInviteButton: element(by.css('.new-invite-button')),
  usersHeadings: element(by.css('.user.headings')),
  usersListContainer: element(by.css('.users-list')),
  usersList: element.all(by.repeater('user in $ctrl.users')),

  userByIndex: function(index) {
    var user = this.usersList.get(index);

    return {
      fullName: user.element(by.css('.user-full-name')),
      email: user.element(by.css('.user-email')),
      status: user.element(by.css('.user-status')),
    };
  }
}, base);
