'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  new: function(attrs) {

    var achAccount = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      full_name: faker.name.findName(),
      email: faker.internet.email(),
      status: 'achcustomerstatus'
    };

    if (attrs) {
      achAccount = _.extend(achAccount, attrs);
    }

    return achAccount;
  }
};
