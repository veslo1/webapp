'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();

var officeMember = Generators.funderOrgOfficeMember.new();

var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id, primary_contact_user_id: officeMember.user.id });

var achAccount = Generators.achAccount.new({id: 123});

var page = requireHelper.page('funder-organization-office-member-edit')(funderOrg.id, funderOffice.id, officeMember.id);
var specHelper = requireHelper.specHelper(page);

var updateRequest = requireHelper.request('funder_organization_office_members/update')(officeMember.id);

describe('edit funder org office member', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_office_members/show')(officeMember),
      updateRequest,
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id, [officeMember]),
      requireHelper.request('funder_organization_office_members/potential_parent_members')(officeMember.id, []),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id, achAccount),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id)
    ]);

    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_manage_funders: true });
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('shows office member details', function() {
    specHelper.get();

    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Members / ${officeMember.user.full_name}`);

    expect(page.name.getText()).toEqual(officeMember.user.full_name);
    expect(page.email.getText()).toEqual(officeMember.user.email);
    expect(page.canCreateProjectCheckbox.isPresent()).toEqual(true);
  });

  describe('successful edit of member permissions', function() {
    it('can edit funder organization office', function() {
      specHelper.get();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Members / ${officeMember.user.full_name}`);

      page.canCreateProjectCheckbox.click();

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name}`);
      expect(page.toastMessage.getText()).toEqual('Funder office member updated.');
    });
  });
});
