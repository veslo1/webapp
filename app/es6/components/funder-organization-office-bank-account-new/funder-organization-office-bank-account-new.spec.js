'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();
var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });

var page = requireHelper.page('funder-organization-office-bank-account-new')(funderOffice);
var specHelper = requireHelper.specHelper(page);

describe('new merchant bank account', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/bank_accounts/create')(funderOffice.id),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id)
    ]);

    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('has correct title', function() {
    specHelper.get();

    expect(page.h2Title.getText()).toEqual(funderOrg.name);

    page.form.accountInfo.accountName.sendKeys('my bank');
    page.form.accountInfo.accountType.sendKeys('Checking');

    page.form.accountInfo.routingNumber.sendKeys('routing number 1');
    page.form.accountInfo.routingNumberConfirmation.sendKeys('routing number 1');

    page.form.accountInfo.accountNumber.sendKeys('account number 1');
    page.form.accountInfo.accountNumberConfirmation.sendKeys('account number 1');

    expect(page.submitButton.getAttribute('disabled')).toEqual('true');

    expect(page.form.tosAgreementPreface.getText()).toEqual(`In order to use the payment functionality of our application, you must open a "White Label" account provided by Dwolla, Inc. ("Dwolla") and you must accept the Dwolla Terms of Service and Privacy Policy. Any funds held in the Dwolla account are held by Dwolla's financial institution partners as set out in the Dwolla Terms of Service. You authorize BuildPay to share your identity and account data with Dwolla for the purposes of opening and supporting your Dwolla account, and you are responsible for the accuracy and completeness of that data. You understand that you will access and manage your Dwolla account through the BuildPay application, and Dwolla account notifications will be sent by BuildPay, not Dwolla. BuildPay will provide customer support for your Dwolla account activity, and can be reached at 1.844.303.5123.`)

    page.form.dwollaAchAgreementCheckbox.click();

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Bank account added.');
    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name}`);
  });
});
