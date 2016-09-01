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
      fund_type: 'material_funds',
      from_user: UserGenerator.newUser(),
      to_user: UserGenerator.newUser(),
      acknowledged: false,
      can_acknowledge: false
    };

    if (attrs) {
      record = _.extend(record, attrs);
    }

    return record;
  }
};
