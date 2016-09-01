'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('reset_password');
var specHelper = requireHelper.specHelper(page);

describe('forgot password', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('projects')(),
      requireHelper.request('reset_password')('abc123')
    ]);
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can send password reset link', function() {
    expect(page.h2Title.getText()).toEqual('Reset Password');
    expect(page.activeNavbarItem.isPresent()).toBe(false);

    page.newPassword.sendKeys('Password123!');
    page.newPasswordConfirmation.sendKeys('Password123!');

    //expect(page.fieldErrorsFor('new_password').getText()).toEqual('hello');

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual('Log In');
    expect(page.toastMessage.getText()).toEqual('Password has been reset.');
  });
});
