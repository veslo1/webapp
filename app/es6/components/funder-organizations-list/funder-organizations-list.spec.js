'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var page = requireHelper.page('funder_organizations');
var specHelper = requireHelper.specHelper(page);

var funderOrg1 = Generators.funderOrganization.new();
var funderOrg2 = Generators.funderOrganization.new();

describe('Funder Organizations', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organizations')([ funderOrg1, funderOrg2 ]),
      requireHelper.request('funder_organization')(funderOrg1),
      //requireHelper.request('funder_offices')(funderOrg1.id)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('when user can create funder organizations', function() {
    beforeEach(function() {
      specHelper.setSystemPermissions({ can_manage_funders: true });
      specHelper.get();
    });

    it('displays existing funder organizations', function() {
      var funderOrgEl1 = page.funderOrgByIndex(1);
      expect(funderOrgEl1.name.getText()).toEqual(funderOrg1.name);
      var funderOrgEl2 = page.funderOrgByIndex(2);
      expect(funderOrgEl2.name.getText()).toEqual(funderOrg2.name);
    });

    it('can view an existing funder organization', function() {
      var funderOrgEl1 = page.funderOrgByIndex(1);
      funderOrgEl1.nameLink.click();
      expect(page.h2Title.getText()).toEqual(funderOrg1.name);
    });

    it('can click add new funder organization button', function() {
      page.newFunderButton.click();
      expect(page.h2Title.getText()).toEqual('New Funder');
    });
  });
});
