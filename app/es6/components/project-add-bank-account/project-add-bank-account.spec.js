'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var page = requireHelper.page('add_project_bank_account')(project.id);
var specHelper = requireHelper.specHelper(page);

var account1 = Generators.bankAccount.new();
var account2 = Generators.bankAccount.new();

describe('adding bank account to project', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/potential_bank_accounts')(project.id, [ account1, account2 ]),
      requireHelper.request('project/add_bank_account')(project.id)
    ]);

    specHelper.simulateFunderUser();
    specHelper.getOnce();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('highlights overview tab in sections tab', function() {
    expect(page.activeSectionsTab.getText()).toEqual('Overview');
  });

  it('shows potential bank accounts', function() {
    var accountEl1 = page.accounts(0);
    var accountEl2 = page.accounts(1);

    expect(accountEl1.accountName.getText()).toEqual(account1.account_info.account_name);
    expect(accountEl2.accountName.getText()).toEqual(account2.account_info.account_name);
  });

  it('can add bank account to project', function() {
    var accountEl = page.accounts(0);
    accountEl.addButton.click();
    expect(page.toastMessage.getText()).toEqual('Project bank account changed.')
  });
});
