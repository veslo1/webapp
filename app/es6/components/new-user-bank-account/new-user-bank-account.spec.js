'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var account1 = Generators.bankAccount.new();
var account2 = Generators.bankAccount.new();

var page = requireHelper.page('new-bank-account');
var specHelper = requireHelper.specHelper(page);

describe('new user bank account', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('bank_accounts/index')([ account1, account2 ]),
      requireHelper.request('bank_accounts/create')(),
      requireHelper.request('ach_account')()
    ]);
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('as normal user', function() {
    beforeEach(function() {
      specHelper.simulateNormalUser();
      specHelper.get();
    });

    it('can submit new bank account', function() {
      expect(page.h2Title.getText()).toEqual('New Bank Account');

      page.form.companyInfo.name.sendKeys('company name');
      page.form.companyInfo.ein.sendKeys('33-1234567');
      page.form.companyInfo.dba.sendKeys('company dba');
      page.form.companyInfo.type.sendKeys('LLC');
      page.form.companyInfo.website.sendKeys('company website');

      page.form.userInfo.email.sendKeys('user@example.com');
      page.form.userInfo.firstName.sendKeys('user first name');
      page.form.userInfo.lastName.sendKeys('user last name');

      page.form.userInfo.address.street1.sendKeys('street 1');
      page.form.userInfo.address.street2.sendKeys('street 2');
      page.form.userInfo.address.city.sendKeys('St. Louis');
      page.form.userInfo.address.state.sendKeys('MO');
      page.form.userInfo.address.postalCode.sendKeys('63104');

      page.form.userInfo.phoneNumber.sendKeys('1112223333');

      page.form.accountInfo.accountName.sendKeys('my bank');
      page.form.accountInfo.accountType.sendKeys('Checking');
      page.form.accountInfo.routingNumber.sendKeys('routing number 1');
      page.form.accountInfo.routingNumberConfirmation.sendKeys('routing number 1');

      page.form.accountInfo.accountNumber.sendKeys('account number 1');
      page.form.accountInfo.accountNumberConfirmation.sendKeys('account number 1');

      expect(page.submitButton.getAttribute('disabled')).toEqual('true');

      expect(page.form.tosAgreementPreface.getText()).toEqual(`As a Service Provider, you expressly authorize BuildPay's payments provider, Dwolla to originate credit transfers to your financial institution.`)

      page.form.dwollaAchAgreementCheckbox.click();

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Bank account added.');
      expect(page.h2Title.getText()).toEqual('My Bank Accounts');
    });
  });

  describe('as funder', function() {
    beforeEach(function() {
      specHelper.simulateFunderUser();
      specHelper.get();
    });

    it('shows different tos agreement preface', function() {
      expect(page.form.tosAgreementPreface.getText()).toEqual(`In order to use the payment functionality of our application, you must open a "White Label" account provided by Dwolla, Inc. ("Dwolla") and you must accept the Dwolla Terms of Service and Privacy Policy. Any funds held in the Dwolla account are held by Dwolla's financial institution partners as set out in the Dwolla Terms of Service. You authorize BuildPay to share your identity and account data with Dwolla for the purposes of opening and supporting your Dwolla account, and you are responsible for the accuracy and completeness of that data. You understand that you will access and manage your Dwolla account through the BuildPay application, and Dwolla account notifications will be sent by BuildPay, not Dwolla. BuildPay will provide customer support for your Dwolla account activity, and can be reached at 1.844.303.5123.`)
    });
  });
});
