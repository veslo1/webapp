'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();
var projectMember = Generators.projectMember.new({ project_id: project.id });

var page = requireHelper.page('project_member_add_bank_account')(project.id, projectMember.id);
var specHelper = requireHelper.specHelper(page);

var account1 = Generators.bankAccount.new();
var account2 = Generators.bankAccount.new();

describe('adding bank account for project member', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/member')(projectMember),
      requireHelper.request('bank_accounts/index')([ account1, account2 ]),
      requireHelper.request('project/member/update_bank_account')(project.id, projectMember.id)
    ]);

    specHelper.simulateNormalUser();
    specHelper.getOnce();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('highlights member tab in sections tab', function() {
    expect(page.activeSectionsTab.getText()).toEqual('Members');
  });

  it('shows potential bank accounts', function() {
    var accountEl1 = page.accounts(0);
    var accountEl2 = page.accounts(1);

    expect(accountEl1.accountName.getText()).toEqual(account1.account_info.account_name);
    expect(accountEl2.accountName.getText()).toEqual(account2.account_info.account_name);
  });

  it('can add bank account for project member', function() {
    var accountEl = page.accounts(0);
    accountEl.addButton.click();
    expect(page.toastMessage.getText()).toEqual('Project member bank account changed.')
  });
});
