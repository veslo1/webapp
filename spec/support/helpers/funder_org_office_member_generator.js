'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  new: function(attrs) {
    var user = UserGenerator.newUser();

    var funderOfficeMember = {
      id: faker.random.number(),
      user: user
    };

    if (attrs) {
      funderOfficeMember = _.extend(funderOfficeMember, attrs);
    }

    return funderOfficeMember;
  },
};
