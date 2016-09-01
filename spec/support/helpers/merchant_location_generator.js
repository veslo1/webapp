'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  new: function(attrs) {
    var merchantLocation = {
      id: faker.random.number(),
      merchant_id: faker.random.number(),
      store_number: '' + faker.random.number(),
      name: faker.company.companyName(),
      address: {
        street1: faker.address.streetAddress(),
        street2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        postal_code: faker.address.zipCode(),
      },
      phone_numbers: {
        primary: faker.phone.phoneNumber(),
        fax: faker.phone.phoneNumber()
      },
      primary_contact_user: UserGenerator.newUser(),

      bank_account_id: '123',
      bank_account_name: 'Checking1',
      bank_account_verified: true,
      created_at: "2015-10-05T21:39:43.616Z",
      updated_at: "2015-10-05T21:39:55.128Z",
    };

    if (attrs) {
      merchantLocation = _.extend(merchantLocation, attrs);
    }

    return merchantLocation;
  }
};
