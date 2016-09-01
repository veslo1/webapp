'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('users-list');
var specHelper = requireHelper.specHelper(page);

var UserGenerator = requireHelper.helper('random_user_generator');
var user1 = UserGenerator.newUser();
var user2 = UserGenerator.newUser();

var usersRequest = requireHelper.request('users')([ user1, user2 ]);

describe('users page', function() {
  describe('logged in', function() {
    beforeEach(function() {
      specHelper.stubRequests([ usersRequest ]);

      specHelper.simulateNormalUser();
      specHelper.setSystemPermissions({ can_view_directory: true });
    });

    afterEach(function() {
      specHelper.teardown();
    });

    it('highlights directory link in navbar', function() {
      specHelper.get();

      expect(page.activeNavbarItem.getText()).toEqual('Directory');
      expect(page.h2Title.getText()).toEqual('Directory');
      expect(page.newInviteButton.isDisplayed()).toEqual(true);
      expect(page.usersHeadings.getText()).toEqual("Name\nEmail\nStatus");
    });

    describe('there are users', function() {
      it('lists users', function() {
        specHelper.get();

        expect(page.usersListContainer.getText()).not.toContain('No users');
        expect(page.usersList.count()).toEqual(2);

        var user1El = page.userByIndex(0);

        expect(user1El.fullName.getText()).toEqual(user1.full_name);
        expect(user1El.email.getText()).toEqual(user1.email);
        expect(user1El.status.getText()).toEqual(user1.status);

        var user2El = page.userByIndex(1);

        expect(user2El.fullName.getText()).toEqual(user2.full_name);
        expect(user2El.email.getText()).toEqual(user2.email);
        expect(user2El.status.getText()).toEqual(user2.status);
      });
    });

    describe('there are no users', function() {
      beforeEach(function() {
        usersRequest.response.users = [];
        specHelper.get();
      });

      it('shows no users', function() {
        expect(page.usersListContainer.getText()).toContain('No users');
      });
    });
  });

  describe('not logged in', function() {
    var invalidResponse = function(method, url, data, headers) {
      return [401, { errors: [ 'Invalid Auth Token' ] }, {}];
    };

    beforeEach(function() {
      usersRequest.response = invalidResponse;
      specHelper.get();
    });

    it('redirects to login page', function() {
      expect(page.h2Title.getText()).toEqual('Log In');
    });
  });
});
