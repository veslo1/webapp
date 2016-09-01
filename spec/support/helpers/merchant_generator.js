'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  newMerchant: function(attrs) {
    var merchant = {
      id: faker.random.number(),
      merchant_id: faker.random.number(),
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
      created_at: "2015-10-05T21:39:43.616Z",
      updated_at: "2015-10-05T21:39:55.128Z",
    };

    if (attrs) {
      merchant = _.extend(merchant, attrs);
    }

    return merchant;
  }
};
