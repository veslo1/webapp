'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('login_page');
var specHelper = requireHelper.specHelper(page);

var projectsRequest = requireHelper.request('projects')();
var loginRequest = requireHelper.request('login');

describe('logging in', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      loginRequest,
      projectsRequest
    ]);
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('has correct title', function() {
    expect(page.h2Title.getText()).toEqual('Log In');
  });

  it('does not highlight any navbar items', function() {
    expect(page.activeNavbarItem.isPresent()).toBe(false);
  });

  it('can login successfully', function() {
    page.email.sendKeys(loginRequest.data.email);
    page.password.sendKeys(loginRequest.data.password);

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual('Projects');
    expect(page.toastMessage.getText()).toEqual('Logged In!');
  });

  it('can click forgot password', function() {
    page.forgotPasswordLink.click();
    expect(page.h2Title.getText()).toEqual('Forgot Password');
  });
});
