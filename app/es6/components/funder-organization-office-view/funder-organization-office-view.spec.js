'use strict';

var requireHelper = require('../../../../spec/support/require_helper');

var Generators = requireHelper.generators();
var funderOrg = Generators.funderOrganization.new();
var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });

var memberUser1 = Generators.user.newUser();
var memberUser2 = Generators.user.newUser();

var officeMember1 = Generators.funderOrgOfficeMember.new();
var officeMember2 = Generators.funderOrgOfficeMember.new();

var achAccount = Generators.achAccount.new({id: 123});

var bankAccount1 = Generators.bankAccount.new({ status: 'verified' });
var bankAccount2 = Generators.bankAccount.new({ status: 'microdeposits_added' });

var page = requireHelper.page('funder-organization-office-view')(funderOrg.id, funderOffice.id);
var specHelper = requireHelper.specHelper(page);

describe('Funder Organizations', function() {
  var memberEl1, memberEl2, bankAccountEl1, bankAccountEl2;

  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id, [ officeMember1, officeMember2 ]),
      requireHelper.request('funder_organization_offices/potential_primary_contacts')(funderOffice.id, [memberUser1, memberUser2]),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id, achAccount),
      requireHelper.request('funder_organization_offices/potential_parent_members')(funderOffice.id),
      requireHelper.request('funder_organization_office_members/potential_parent_members')(officeMember1.id),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id, [ bankAccount1, bankAccount2 ]),
      requireHelper.request('funder_organization_office_members/show')(officeMember1)
    ]);

    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_manage_funders: true });

    memberEl1 = page.officeMemberByIndex(0);
    memberEl2 = page.officeMemberByIndex(1);

    bankAccountEl1 = page.bankAccounts(0);
    bankAccountEl2 = page.bankAccounts(1);
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('displays existing funder organization and allows editing', function() {
    specHelper.get();

    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name}`)

    expect(page.dba.getText()).toEqual(funderOffice.dba);

    expect(page.address.street1.getText()).toEqual(funderOffice.address.street1);
    expect(page.address.street2.getText()).toEqual(funderOffice.address.street2);
    expect(page.address.city.getText()).toEqual(funderOffice.address.city);
    expect(page.address.state.getText()).toEqual(funderOffice.address.state);
    expect(page.address.postalCode.getText()).toEqual(funderOffice.address.postal_code);

    expect(page.website.getText()).toEqual(funderOffice.website);

    expect(page.officePhone.getText()).toEqual(funderOffice.phone_numbers.primary);
    expect(page.fax.getText()).toEqual(funderOffice.phone_numbers.fax);
    expect(page.primaryContact.getText()).toEqual(funderOffice.primary_contact_user.full_name);

    expect(memberEl1.name.getText()).toEqual(officeMember1.user.full_name);
    expect(memberEl2.name.getText()).toEqual(officeMember2.user.full_name);

    expect(bankAccountEl1.accountName.getText()).toEqual(bankAccount1.account_info.account_name);
    expect(bankAccountEl1.verifyButton.isPresent()).toEqual(false);

    expect(bankAccountEl2.accountName.getText()).toEqual(bankAccount2.account_info.account_name);
    expect(bankAccountEl2.verifyButton.isPresent()).toEqual(true);

    expect(page.officeAchAccount.name.getText()).toEqual(achAccount.full_name);
    expect(page.officeAchAccount.email.getText()).toEqual(achAccount.email);
    expect(page.newOfficeAchAccountButton.isPresent()).toBe(false);

    page.editOfficeButton.click();

    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Edit`);
  });

  it('can click add member', function() {
    specHelper.get();

    page.newOfficeMemberButton.click();
    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name } / Add Member`);
  });

  it('can click existing project member and go to edit member page', function()  {
    specHelper.get();

    var officeMemberEl1 = page.officeMemberByIndex(0);
    officeMemberEl1.nameLink.click();

    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Members / ${officeMember1.user.full_name}`);
  });

  describe('valid to add ach account - (ach account has not been created yet AND primary contact is set)', function() {
    beforeEach(function() {
      achAccount.id = '';
    });

    it('can click add account', function() {
      specHelper.get();

      page.newOfficeAchAccountButton.click();
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name } / Add Responsible Individual`);
    });
  });

  describe('invalid to add ach account - (primary contact is NOT set)', function(){
    beforeEach(function() {
      achAccount.id = '';
      funderOffice.can_add_ach_account = false;
      funderOffice.prevalidation_errors.can_add_ach_account = ["Office primary contact must be set"];
    });

    it('disables add account button', function() {
      specHelper.get();

      expect(page.newOfficeAchAccountButton.isEnabled()).toBe(false);
      expect(page.addAchAccountErrors.getText()).toEqual('Office primary contact must be set.');
    });
  });

  describe('valid to add bank account - (bank account has not been created yet AND primary contact is set)', function() {
    beforeEach(function() {
      funderOffice.can_add_bank_account = true;
      funderOffice.prevalidation_errors.can_add_bank_account = [];
    });

    it('can click add account', function() {
      specHelper.get();

      page.newOfficeBankAccountButton.click();
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name } / New Bank Account`);
    });
  });

  describe('invalid to add bank account - (primary contact is NOT set)', function(){
    beforeEach(function() {
      funderOffice.can_add_bank_account = false;
      funderOffice.prevalidation_errors.can_add_bank_account = ["Office primary contact must be set"];
    });

    it('disables add account button', function() {
      specHelper.get();

      expect(page.newOfficeBankAccountButton.isEnabled()).toBe(false);
      expect(page.addBankAccountErrors.getText()).toEqual('Office primary contact must be set.');
    });
  });

  describe('verifying account', function() {
    it('allows me to verify bank account', function() {
      specHelper.get();

      bankAccountEl2.verifyButton.click();

      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name } / Verify Bank Account`);
    });
  });
});
