'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();
var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });

var officeMember1 = Generators.funderOrgOfficeMember.new();
var officeMember2 = Generators.funderOrgOfficeMember.new();

var page = requireHelper.page('funder-organization-office-member-new')(funderOffice);
var specHelper = requireHelper.specHelper(page);

var inviteRequest = requireHelper.request('invites/create')();

describe('new funder office member', function() {
  var userEl1, userEl2;

  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id),
      requireHelper.request('funder_organization_offices/potential_parent_members')(funderOffice.id, [officeMember1, officeMember2]),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id),
      inviteRequest,
      requireHelper.request('funder_organization_offices/add_member')(funderOffice.id),
    ]);

    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_manage_funders: true });
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    it('is correct', function() {
      specHelper.get();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Add Member`);
    });
  });

  describe('successful response', function() {
    it('can create new office member', function() {
      specHelper.get();

      page.firstName.sendKeys('some');
      page.lastName.sendKeys('user');
      page.email.sendKeys('user@somesite.com');
      page.parentOfficeMemberOption(officeMember2.user.full_name).click();

      page.submitButton.click();

      expect(page.userExistsAlert.isPresent()).toEqual(false);
      expect(page.inviteMemberConfirmButton.isPresent()).toEqual(false);
      expect(page.inviteMemberResetButton.isPresent()).toEqual(false);

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toContain(`Offices / ${funderOffice.name}`);
      expect(page.toastMessage.getText()).toEqual('Office member added.');
    });
  });

  describe('user already exists in system', function() {
    beforeEach(function() {
      inviteRequest.response = function() {
        var json = {
          errors: {
            email: ['has already been taken']
          }
        };

        return [422, json, {}];
      };

      specHelper.get();

      page.firstName.sendKeys('some');
      page.lastName.sendKeys('user');
      page.email.sendKeys('user@somesite.com');

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Add Member`);
      expect(page.toastMessage.isPresent()).toEqual(false);
      expect(page.userExistsAlert.getText()).toContain('A user already exists with the email address');
      expect(page.inviteSubmitButton.isDisplayed()).toEqual(false);
    });

    it('can confirm adding office member', function() {
      page.inviteMemberConfirmButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toContain(`Offices / ${funderOffice.name}`);
      expect(page.toastMessage.getText()).toEqual('Office member added.');
    });

    it('can cancel adding office member', function() {
      page.inviteMemberResetButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toContain(`Offices / ${funderOffice.name}`);
      expect(page.toastMessage.isPresent()).toEqual(false);
    });
  });
});
