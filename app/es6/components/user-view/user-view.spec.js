'use strict';

var requireHelper = require('../../../../spec/support/require_helper');

var UserGenerator = requireHelper.helper('random_user_generator');
var user = UserGenerator.newUser();

var page = requireHelper.page('user-view')(user.id);
var specHelper = requireHelper.specHelper(page);

var userRequest = requireHelper.request('user')(user);
var reinviteRequest = requireHelper.request('reinvite')(user.id);

describe('view user', function() {
  var formattedDates;

  beforeEach(function() {
    specHelper.stubRequests([
      userRequest,
      reinviteRequest
    ]);
    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_view_directory: true });
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('shows user', function() {
    specHelper.get();

    expect(page.h2Title.getText()).toEqual(user.first_name + ' ' + user.last_name);
    expect(page.activeNavbarItem.getText()).toEqual('Directory');

    expect(page.email.getText()).toEqual(user.email);

    expect(page.registeredAt.getText()).toMatch(page.dateFormatRegex);
    page.registeredAt.getText().then(function(dateString) {
      var actual = page.dateToUTCString(dateString);
      var expected = page.dateToUTCString(user.registered_at);
      expect(actual).toEqual(expected);
    });

    expect(page.createdAt.getText()).toMatch(page.dateFormatRegex);
    page.createdAt.getText().then(function(dateString) {
      var actual = page.dateToUTCString(dateString);
      var expected = page.dateToUTCString(user.created_at);
      expect(actual).toEqual(expected);
    });
    expect(page.status.getText()).toEqual(user.status);
  });

  describe('can resend invite', function() {
    beforeEach(function() {
      userRequest.response.permissions.can_resend_invite = true;
    });

    it('allows invitor to resend invite', function() {
      specHelper.get();
      page.resendInviteButton.click();
      expect(page.toastMessage.getText()).toEqual('Invite resent.')
    });
  });

  describe('cannot resend invite', function() {
    beforeEach(function() {
      userRequest.response.permissions.can_resend_invite = false;
    });

    it('shows resend invite button', function() {
      specHelper.get();
      expect(page.resendInviteButton.isPresent()).toBe(false);
    });
  });
});
