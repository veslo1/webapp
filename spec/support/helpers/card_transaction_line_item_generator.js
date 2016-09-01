'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  new: function(attrs) {
    var lineItem = {
      sku_number: faker.random.uuid(),
      quantity: faker.random.number(),
      how_sold: faker.commerce.department(),
      description: faker.commerce.productName(),
      total_quantity: faker.random.number(),
      unit_price: faker.commerce.price(),
      per: faker.random.number(),
      net_amount: faker.finance.amount(),
      created_at: faker.date.past(),
      updated_at: faker.date.past()
    }

    if (attrs) {
      lineItem = _.extend(lineItem, attrs);
    }

    return lineItem;
  }
};
