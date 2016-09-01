'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();
var office1 = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });
var office2 = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });

var page = requireHelper.page('funder_organization_offices')(funderOrg.id);
var specHelper = requireHelper.specHelper(page);

describe('Funder Organization Offices', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organizations/offices')(funderOrg.id, [ office1, office2 ]),
      requireHelper.request('funder_organization_offices/show')(office1),
      requireHelper.request('funder_organization_offices/members')(office1.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(office1.id),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(office1.id),
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('when user can create funder organizations', function() {
    var officeEl1, officeEl2;

    beforeEach(function() {
      specHelper.setSystemPermissions({ can_manage_funders: true });
      specHelper.get();

      officeEl1 = page.officeByIndex(0);
      officeEl2 = page.officeByIndex(1);
    });

    it('displays existing funder organizations', function() {
      expect(officeEl1.name.getText()).toEqual(office1.name);
      expect(officeEl1.location.getText()).toEqual(office1.address.city + ', ' + office1.address.state + ' ' + office1.address.postal_code);
      expect(officeEl1.primaryContact.getText()).toEqual(office1.primary_contact_user.full_name);

      expect(officeEl2.name.getText()).toEqual(office2.name);
      expect(officeEl2.location.getText()).toEqual(office2.address.city + ', ' + office2.address.state + ' ' + office2.address.postal_code);
      expect(officeEl2.primaryContact.getText()).toEqual(office2.primary_contact_user.full_name);
    });

    it('can click add new funder office button', function() {
      page.newOfficeButton.click();
      expect(page.detailsHeader.getText()).toEqual('Offices / New Office');
    });

    it('can click on office page', function() {
      officeEl1.nameLink.click();
      expect(page.detailsHeader.getText()).toContain(`Offices / ${office1.name}`);
    });
  });
});
