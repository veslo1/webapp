'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('new-user');
var specHelper = requireHelper.specHelper(page);

describe('new user registration', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('invites'),
      requireHelper.request('registration')(),
      requireHelper.request('projects')()
    ]);

    specHelper.getOnce();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('has correct title', function() {
    expect(page.h2Title.getText()).toEqual('Sign Up');
  });

  it('does not show navbar', function() {
    expect(page.activeNavbarItem.isPresent()).toBe(false);
  });

  it('sets default values from invite obtained from server', function() {
    expect(page.email.getText()).toEqual('samantha.jones@example.com');
    expect(page.firstName.getAttribute('value')).toEqual('Samantha');
    expect(page.lastName.getAttribute('value')).toEqual('Jones');

    page.homeMobilePhone.sendKeys('800-394-5554');
    page.password.sendKeys('Password123!');
    page.passwordConfirmation.sendKeys('Password123!');

    expect(page.submitButton.getAttribute('disabled')).toEqual('true');

    page.termsCheckbox.click();

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual('Projects');
    expect(page.toastMessage.getText()).toEqual('Signed Up!');
  });

  it('shows error if user has already registered', function() {
    specHelper.get();

    page.homeMobilePhone.sendKeys('800-444-4555');
    page.password.sendKeys('ExistingPassword123!');
    page.passwordConfirmation.sendKeys('ExistingPassword123!');

    expect(page.submitButton.getAttribute('disabled')).toEqual('true');

    page.termsCheckbox.click();

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual('Sign Up');
    expect(page.formContent.getText()).toContain('User already active in system');
  });
});
