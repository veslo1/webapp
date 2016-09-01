'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var UserGenerator = requireHelper.helper('random_user_generator');
var user = UserGenerator.newUser({ system_role: 'admin' });

var page = requireHelper.page('user-view')(user.id);
var specHelper = requireHelper.specHelper(page);

var userPermissions = {
  can_change_system_role: true
};

var userRequest = requireHelper.request('user')(user, userPermissions);
var changeRoleRequest = requireHelper.request('change_role')(user.id);

describe('view user', function() {
  beforeEach(function() {
    specHelper.stubRequests([ userRequest, changeRoleRequest ]);
    specHelper.simulateAdminUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('valid role change', function() {
    var validResponse = {
      success: true
    };

    beforeEach(function() {
      changeRoleRequest.response = validResponse;
      specHelper.get();
    });

    it('can make user admin', function() {
      page.roleDropdownOption('Admin').click();
      page.applyRoleButton.click();
      expect(page.toastMessage.getText()).toEqual('User role changed.');
    });
  });

  describe('failure changing role', function() {
    var invalidResponse = function() {
      var resp = {
        success: false,
        errors: {
          role_name: [ 'Must be admin to change user role' ]
        }
      };

      return [422, resp, {} ];
    };

    beforeEach(function() {
      changeRoleRequest.response = invalidResponse;
      specHelper.get();
    });

    it('shows error on page', function() {
      page.roleDropdownOption('Admin').click();
      page.applyRoleButton.click();
      expect(page.roleErrorMessages.getText()).toEqual('Must be admin to change user role');
    });
  });

  describe('user cannot change system role', function() {
    beforeEach(function() {
      userPermissions.can_change_system_role = false;
      specHelper.get();
    });

    it('does not show role dropdown', function() {
      expect(page.roleDropdown.isPresent()).toBe(false);
      expect(page.roleText.getText()).toEqual('admin');
    });
  });
});
