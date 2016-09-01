'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');

module.exports = {
  new: function(attrs) {
    var primaryContact = UserGenerator.newUser();
    var funderOrganizationOffice = {
      id: faker.random.number(),
      funder_organization_id: faker.random.number(),
      name: faker.company.companyName(),
      dba: faker.company.companyName(),
      address: {
        street1: faker.address.streetAddress(),
        street2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        postal_code: faker.address.zipCode(),
      },
      phone_numbers: {
        primary: faker.phone.phoneNumber("###-###-####"),
        fax: faker.phone.phoneNumber("###-###-####")
      },
      website: faker.internet.domainName(),
      ein: '44-1234567',
      primary_contact_user_id: primaryContact.id,
      primary_contact_user: primaryContact,
      company_type: 'llc',
      can_add_ach_account: true,
      prevalidation_errors: {
        can_add_ach_account: []
      },
      permissions: {
        can_create_projects: true
      }
    }

    if (attrs) {
      funderOrganizationOffice = _.extend(funderOrganizationOffice, attrs);
    }

    return funderOrganizationOffice;
  }
};
