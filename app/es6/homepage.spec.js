var requireHelper = require('../../spec/support/require_helper');
var page = requireHelper.page('homepage');
var specHelper = requireHelper.specHelper(page);

describe('buildpay homepage', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('users')(),
      requireHelper.request('projects')(),
      requireHelper.request('profile')(),
      requireHelper.request('merchants')(),
      requireHelper.request('transactions')(),
      requireHelper.request('funder_organizations')()
    ]);

    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('has correct h1 title', function() {
      expect(page.h1Title.getText()).toEqual('BuildPay');
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
      expect(page.navbarEmail.getText()).toEqual(specHelper.currentUser.email);
      expect(page.logoutLink.getText()).toEqual('Logout');
    });

    it('can navigate to projects page', function() {
      page.projectsLink.click();
      expect(page.h2Title.getText()).toEqual('Projects');
    });

    it('can navigate to merchants page ', function() {
      page.merchantsLink.click();
      expect(page.h2Title.getText()).toEqual('Merchants');
    });

    it('can navigate to my profile page', function() {
      page.clickProfileMenuOption();
      expect(page.h2Title.getText()).toEqual('My Profile');
    });
  });

  describe('can view funder organizations', function() {
    it('can click link if user can manage funders', function() {
      specHelper.setSystemPermissions({ can_manage_funders: true });
      specHelper.get();
      page.fundersLink.click();
      expect(page.h2Title.getText()).toEqual('Funders');
    });

    it('does not show funders link if user cannot manage funders', function() {
      specHelper.setSystemPermissions({ can_manage_funders: false });
      specHelper.get();
      expect(page.fundersLink.isPresent()).toEqual(false);
    });
  });

  describe('can view transactions', function() {
    it('can click link if user can view transactions', function() {
      specHelper.setSystemPermissions({ can_view_transactions: true });
      specHelper.get();
      page.transactionsLink.click();
      expect(page.h2Title.getText()).toEqual('Transactions');
    });

    it('does not show transactions link if user cannot view transactions', function() {
      specHelper.setSystemPermissions({ can_view_transactions: false });
      specHelper.get();
      expect(page.transactionsLink.isPresent()).toEqual(false);
    });
  });

  describe('can view directory', function() {
    it('can click link if user can view directory', function() {
      specHelper.setSystemPermissions({ can_view_directory: true });
      specHelper.get();
      page.directoryLink.click();
      expect(page.h2Title.getText()).toEqual('Directory');
    });

    it('does not show directory link if user cannot view directory', function() {
      specHelper.setSystemPermissions({ can_view_directory: false });
      specHelper.get();
      expect(page.directoryLink.isPresent()).toEqual(false);
    });
  });

  describe('can view bank accounts', function() {
    it('can click link if user can view bank accounts', function() {
      specHelper.setSystemPermissions({ can_view_my_bank_accounts: true });
      specHelper.stubRequests([
        requireHelper.request('bank_accounts')(),
        requireHelper.request('ach_account')()
      ]);
      specHelper.get();

      page.navbarEmail.click();
      page.bankAccountsLink.click();

      expect(page.h2Title.getText()).toEqual('My Bank Accounts');
    });

    it('does not show bank accounts link if user cannot view bank accounts', function() {
      specHelper.setSystemPermissions({ can_view_my_bank_accounts: false });
      specHelper.get();
      expect(page.bankAccountsLink.isPresent()).toEqual(false);
    });
  });
});
