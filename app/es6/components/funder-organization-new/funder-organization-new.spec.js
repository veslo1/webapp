'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var page = requireHelper.page('funder_organization_new');
var specHelper = requireHelper.specHelper(page);

describe('new funder organization', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization_create'),
      requireHelper.request('funder_organizations')()
    ]);
    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can create new funder organization', function() {
    expect(page.h2Title.getText()).toEqual('New Funder');

    page.name.sendKeys('Safeco Insurance');
    page.service_fee.sendKeys('3.5');

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Funder created.');
    expect(page.h2Title.getText()).toEqual('Funders');
  });
});
