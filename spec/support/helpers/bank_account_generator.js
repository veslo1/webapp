'use strict';

var _ = require('lodash');
var faker = require('faker');

module.exports = {
  new: function(attrs) {
    var account = {
      id: faker.random.number(),
      status: '',

      company_info: {
        name: faker.company.companyName(),
      },

      user_info: {
        full_name: faker.name.findName(),
        dob: faker.date.past(),
        ssn: faker.random.number(100000000, 999999999),
        phone_number: faker.phone.phoneNumber(),

        address: {
          street1: faker.address.streetAddress(),
          street2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          postal_code: faker.address.zipCode(),
        },
      },

      account_info: {
        account_name: faker.finance.accountName(),
        account_type: 'checking',
        routing_number: faker.finance.account(),
        account_number: faker.finance.account(),
      },

      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    };

    if (attrs) {
      account = _.extend(account, attrs);
    }

    return account;
  }
};
