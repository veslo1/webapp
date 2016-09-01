'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  newUser: function(attrs) {
    var user = {
      id: faker.random.number(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      full_name: faker.name.findName(),
      email: faker.internet.email(),
      status: 'active',
      created_at: "2015-10-05T21:39:43.616Z",
      updated_at: "2015-10-05T21:39:55.128Z",
      registered_at: "2015-10-05T21:39:55.126Z",
      system_role: 'user'
    };

    if (attrs) {
      user = _.extend(user, attrs);
    }

    return user;
  },
  newServiceProvider: function(attrs) {
    return {
      id: faker.random.number(),
      project_id: faker.random.number(),
      user: this.newUser(attrs),
      children: []
    };
  }
};
