'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  newCard: function(attrs) {
    var card = {
      id: faker.random.number(),
      project_id: faker.random.number(),
      user: UserGenerator.newUser(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    };

    if (attrs) {
      card = _.extend(card, attrs);
    }

    return card;
  }
};
