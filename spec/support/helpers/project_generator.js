'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  newProject: function(attrs) {
    var project = {
      id: faker.random.number(),
      name: faker.company.companyName(),
      claim_number: faker.random.uuid(),
      address_1: faker.address.streetAddress(),
      address_2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      postal_code: faker.address.zipCode(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
      description: faker.company.catchPhrase(),
      comments: faker.company.bs(),
      created_by_user_id: faker.random.number(),

      funder_user_id: faker.random.number(),
      funder_organization_id: faker.random.number(),
      funder_organization_name: faker.company.companyName(),
      funder_organization_office_id: faker.random.number(),
      funder_organization_office_name: faker.company.companyName(),
      status: 'not_started',
      bank_account_name: 'not_set',
      can_start_project: false,
      prevalidation_errors: []
    };

    if (attrs) {
      project = _.extend(project, attrs);
    }

    return project;
  }
};
