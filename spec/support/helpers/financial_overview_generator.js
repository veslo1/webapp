'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  new: function(attrs) {
    var record = {
      material_funds: {
        budgeted: faker.finance.amount(200000, 400000),
        allocated: faker.finance.amount(1, 100000),
        spent: faker.finance.amount(1, 100000),
      },
      labor_funds: {
        budgeted: faker.finance.amount(200000, 400000),
        allocated: faker.finance.amount(1, 100000),
        spent: faker.finance.amount(1, 100000),
      }
    };

    if (attrs) {
      record = _.extend(record, attrs);
    }

    return record;
  }
};
