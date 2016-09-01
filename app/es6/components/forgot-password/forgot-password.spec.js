'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('forgot_password');
var specHelper = requireHelper.specHelper(page);

describe('forgot password', function() {
  beforeEach(function() {
    specHelper.stubRequest(requireHelper.request('send_password_reset'));
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('has correct title', function() {
    expect(page.h2Title.getText()).toEqual('Forgot Password');
  });

  it('does not highlight any navbar items', function() {
    expect(page.activeNavbarItem.isPresent()).toBe(false);
  });

  it('can send password reset link', function() {
    page.email.sendKeys('test@example.com');

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual('Log In');
    expect(page.toastMessage.getText()).toEqual('Password reset link sent.');
  });
});
