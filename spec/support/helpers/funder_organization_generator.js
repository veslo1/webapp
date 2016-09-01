'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  new: function(attrs) {
    var funderOrganization = {
      id: faker.random.number(),
      name: faker.company.companyName(),
      service_fee: '' + faker.random.number(0, 8)
    }

    if (attrs) {
      funderOrganization = _.extend(funderOrganization, attrs);
    }

    return funderOrganization;
  }
};
