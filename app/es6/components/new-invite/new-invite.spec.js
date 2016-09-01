'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('new_invite_page');
var specHelper = requireHelper.specHelper(page);

var registrationRequest = requireHelper.request('registration');
var usersRequest = requireHelper.request('users')([]);

var checkUniqueRequest = {
  method: 'GET',
  url: /http:\/\/localhost:3000\/invites\/check_unique/,
  response: function(method, url, data, headers) {
    return [200, { unique: !/existingemail@example\.com/.test(url) }, {}];
  }
};

var inviteParams = {
  first_name: 'Alison',
  last_name: 'Black',
  email: 'alison.black@example.com'
}

var inviteRequest = {
  method: 'POST',
  url: /http:\/\/localhost:3000\/invites/,
  data: {
    invite: inviteParams
  },
  response: { success: true }
};

describe('submitting a new invite', function() {
  beforeEach(function() {
    specHelper.stubRequests([ checkUniqueRequest, inviteRequest, usersRequest ]);
    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_view_directory: true });
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('has correct title', function() {
    expect(page.h2Title.getText()).toEqual('Invite User');
    expect(page.activeNavbarItem.getText()).toEqual('Directory');
  });

  it('creates a new invite when submitting form', function() {
    page.firstName.sendKeys('test first');
    page.lastName.sendKeys('test last');
    page.email.sendKeys('testemail@example.com');

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual('Directory');
    expect(page.toastMessage.getText()).toEqual('Invite sent.');
  });

  it('shows server-side validation errors when invite has an email that already exists', function() {
    page.firstName.sendKeys('Alison');
    page.lastName.sendKeys('Black');
    page.email.sendKeys('existingemail@example.com');

    // Safari requires this
    page.firstName.sendKeys('test firsts');
    // Firefox requires this
    page.email.sendKeys(protractor.Key.TAB);

    expect(page.uniqueErrorMessage()).toEqual('This field value has already been taken!');
  });
});
