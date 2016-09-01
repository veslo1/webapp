'use strict';

var _ = require('lodash');
var faker = require('faker');
var CardLoadGenerator = require('./card_load_generator');
var UserGenerator = require('./random_user_generator');

module.exports = {
  new: function(attrs) {
    var record = {
      id: faker.random.number(),
      card_load: CardLoadGenerator.new(),
      user: UserGenerator.newUser()
    };

    if (attrs) {
      record = _.extend(record, attrs);
    }

    return record;
  }
};
