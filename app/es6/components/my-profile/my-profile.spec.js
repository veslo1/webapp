'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('my_profile');
var specHelper = requireHelper.specHelper(page);

var profile = {
  id: 800,
  email: 'chuck.norris@example.com',
  first_name: 'Chuck',
  last_name: 'Norris',
  address: {
    street1: '2420 Lemp Ave',
    street2: 'Suite 300',
    city: 'St. Louis',
    state: 'MO',
    postal_code: '63104'
  },
  phone_numbers: {
    home: '314-867-5309',
    mobile: '636-123-4567'
  },
  company: {
    name: 'Some Company Name',
    address: {
      street1: '123 Anywhere St.',
      street2: 'Suite 456',
      city: 'Fayetteville',
      state: 'AK',
      postal_code: '12345'
    },
    phone_numbers: {
      work: '636-123-9876',
      mobile: '314-729-2356',
      fax: '314-234-6812'
    },
    url: 'http://company.com'
  }
};

var profileRequest = requireHelper.request('profile')(profile);

var newFirstName = 'Tabitha';
var newLastName = 'Sandstone';

var updateProfileRequest = requireHelper.request('update_profile');

describe('edit profile', function() {
  var formattedDates;

  beforeEach(function() {
    specHelper.stubRequests([profileRequest, updateProfileRequest]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual('My Profile');
    });

    it('shows user profile', function() {
      expect(page.email.getText()).toEqual(profile.email);

      expect(page.firstNameInput.getAttribute('value')).toEqual(profile.first_name);
      expect(page.lastNameInput.getAttribute('value')).toEqual(profile.last_name);

      expect(page.address.street1Input.getAttribute('value')).toEqual(profile.address.street1);
      expect(page.address.street2Input.getAttribute('value')).toEqual(profile.address.street2);
      expect(page.address.cityInput.getAttribute('value')).toEqual(profile.address.city);
      expect(page.address.stateInput.getAttribute('value')).toEqual(profile.address.state);
      expect(page.address.postalCodeInput.getAttribute('value')).toEqual(profile.address.postal_code);
      expect(page.homePhoneInput.getAttribute('value')).toEqual(profile.phone_numbers.home);
      expect(page.mobilePhoneInput.getAttribute('value')).toEqual(profile.phone_numbers.mobile);

      expect(page.company.name.getAttribute('value')).toEqual(profile.company.name);
      expect(page.company.address.street1Input.getAttribute('value')).toEqual(profile.company.address.street1);
      expect(page.company.address.street2Input.getAttribute('value')).toEqual(profile.company.address.street2);
      expect(page.company.address.cityInput.getAttribute('value')).toEqual(profile.company.address.city);
      expect(page.company.address.stateInput.getAttribute('value')).toEqual(profile.company.address.state);
      expect(page.company.address.postalCodeInput.getAttribute('value')).toEqual(profile.company.address.postal_code);
      expect(page.company.workPhoneInput.getAttribute('value')).toEqual(profile.company.phone_numbers.work);
      expect(page.company.mobilePhoneInput.getAttribute('value')).toEqual(profile.company.phone_numbers.mobile);
      expect(page.company.faxInput.getAttribute('value')).toEqual(profile.company.phone_numbers.fax);
      expect(page.company.url.getAttribute('value')).toEqual(profile.company.url);
    });

    it('allows me to edit profile values', function() {
      page.firstNameInput.clear();
      page.firstNameInput.sendKeys(newFirstName);

      page.lastNameInput.clear();
      page.lastNameInput.sendKeys(newLastName);

      page.applyUpdatesButton.click();

      expect(page.toastMessage.getText()).toEqual('Profile updated.')
    });
  });
});
