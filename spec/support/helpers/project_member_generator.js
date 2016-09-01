'use strict';

var _ = require('lodash');
var faker = require('faker');
var ProjectGenerator = require('./project_generator');
var UserGenerator = require('./random_user_generator');

module.exports = {
  new: function(attrs) {
    var user = UserGenerator.newUser();

    var projectMember = {
      id: user.id,
      project_id: faker.random.number(),
      user: user,
      role_description: 'Plumber',
      bank_account_status: 'Account Set',
      bank_account_name: faker.finance.accountName(),
      card_requested: false,
      card_requested_at: null,
      card_issued: false,
      card_issued_at: null,
      can_have_card: true,
      prevalidation_errors: {
        can_have_card: []
      }
    };

    if (attrs) {
      projectMember = _.extend(projectMember, attrs);
    }

    return projectMember;
  },
};
