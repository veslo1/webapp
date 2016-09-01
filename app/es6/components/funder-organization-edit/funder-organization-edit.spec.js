'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();

var page = requireHelper.page('funder_organization_edit')(funderOrg.id);
var specHelper = requireHelper.specHelper(page);

describe('edit merchant', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_update')(funderOrg.id),
    ]);

    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can edit funder organization', function() {
    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.detailsHeader.getText()).toEqual('Overview');

    page.name.sendKeys('Geico');
    page.serviceFee.sendKeys('2.75');

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Funder updated.');
    expect(page.h2Title.getText()).toContain('Geico');
  });
});
