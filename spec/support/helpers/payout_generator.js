'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  new: function(attrs) {
    var record = {
      id: faker.random.number(),
      created_at: faker.date.past(),
      project_id: faker.random.number(),
      fund_amount: faker.finance.amount(1, 100000),
      user: UserGenerator.newUser(),
      approved: false,
      approved_at: '',
      acknowledged: false,
      acknowledged_at: '',
      approvals: [],
      total_approvals_required: 3
    };

    if (attrs) {
      record = _.extend(record, attrs);
    }

    return record;
  }
};
