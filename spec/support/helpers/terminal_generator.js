'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  new: function(attrs) {
    var terminal = {
      id: faker.random.number(),
      serial_number: '' + faker.random.number(),
      terminal_identifier: '' + faker.random.number(),
      created_at: "2015-10-05T21:39:43.616Z",
      updated_at: "2015-10-05T21:39:55.128Z",
    };

    if (attrs) {
      terminal = _.extend(terminal, attrs);
    }

    return terminal;
  }
};
