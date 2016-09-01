'use strict';

var requireHelper = require('../../../../spec/support/require_helper');

var Generators = requireHelper.generators();
var funderOrg = Generators.funderOrganization.new();

var page = requireHelper.page('funder_organization')(funderOrg.id);
var specHelper = requireHelper.specHelper(page);

describe('Funder Organizations', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('has permission', function() {
    beforeEach(function() {
      specHelper.setSystemPermissions({ can_manage_funders: true });
      specHelper.get();
    });

    it('displays existing funder organization and allows editing', function() {
      expect(page.name.getText()).toEqual(funderOrg.name);
      expect(page.service_fee.getText()).toEqual(funderOrg.service_fee);

      expect(page.submitButton.isPresent()).toEqual(false);
      page.editButton.click();
      expect(page.submitButton.isPresent()).toEqual(true);
    });
  })
});
