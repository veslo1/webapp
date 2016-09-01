'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();
var fundsTotals = Generators.financialOverview.new();

var page = requireHelper.page('project')(project.id);
var specHelper = requireHelper.specHelper(page);

var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);

describe('view project overview', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/notifications')(project.id),
      requireHelper.request('project/financial_overview')(project.id, fundsTotals),
      projectPermissionsRequest,
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

    it('shows project details', function() {
      expect(page.h2Title.getText()).toEqual(project.name);
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
      expect(page.activeSectionsTab.getText()).toEqual('Overview');

      expect(page.claimNumber.getText()).toEqual(project.claim_number);
      expect(page.city.getText()).toEqual(project.city);
      expect(page.state.getText()).toEqual(project.state);
      expect(page.postalCode.getText()).toEqual(project.postal_code);
      expect(page.address1.getText()).toEqual(project.address_1);
      expect(page.address2.getText()).toEqual(project.address_2);
      expect(page.description.getText()).toEqual(project.description);
      expect(page.comments.getText()).toEqual(project.comments);
      expect(page.status.getText()).toEqual('Not Started');
      expect(page.bankAccountName.isPresent()).toBe(false);
      expect(page.setProjectBankAccountLink.isPresent()).toBe(false);
    });
  });

  describe('editing project', function() {
    describe('user can edit project', function() {
      it('can click edit project button', function() {
        projectPermissionsRequest.response.permissions.can_edit_project = true;
        specHelper.get();

        page.editProjectButton.click();
        expect(page.h4Title.getText()).toEqual('Edit Project');
      });
    });

    describe('user CANNOT edit project', function() {
      it('cannot click edit project button', function() {
        projectPermissionsRequest.response.permissions.can_edit_project = false;
        specHelper.get();

        expect(page.editProjectButton.isPresent()).toEqual(false);
      });
    });
  });

  describe('link to view bank accounts to associate to the project', function() {
    beforeEach(function() {
      projectPermissionsRequest.response.permissions.can_view_project_bank_account = true;
      projectPermissionsRequest.response.permissions.can_change_project_bank_account = true;
      specHelper.stubRequests([
        requireHelper.request('project/potential_bank_accounts')(project.id, []),
      ]);
      specHelper.get();
    });

    it('allows me to view bank accounts', function() {
      expect(page.bankAccountName.isPresent()).toBe(true);
      expect(page.bankAccountName.getText()).toEqual('Not Set');
      expect(page.setProjectBankAccountLink.isPresent()).toBe(true);
      expect(page.setProjectBankAccountLink.getText()).toEqual('CHANGE');
      page.setProjectBankAccountLink.click();
      expect(page.h4Title.getText()).toEqual('Change Bank Account');
    });
  });

  describe('active project with ACH account info', function() {
    beforeEach(function() {
      project.status = 'started';
      project.bank_account_name = 'Checking #1 at Chase';
      specHelper.getOnce();
    });

    it('does not show change bank account button', function() {
      expect(page.setProjectBankAccountLink.isDisplayed()).toBe(false);
    });

    it('shows correct status', function() {
      expect(page.status.getText()).toEqual('Started');
    });

    it('shows correct ach bank account name', function() {
      expect(page.bankAccountName.getText()).toEqual('Checking #1 at Chase');
    });
  });

  describe('overview funds totals', function() {
    describe('user has permissions to see funds totals', function() {
      beforeEach(function() {
        projectPermissionsRequest.response.permissions.can_view_funds_totals = true;
      });

      it('shows total numbers', function() {
        specHelper.get();

        expect(page.fundsSection.budgeted.total.getText()).toEqual(accounting.formatMoney(parseFloat(fundsTotals.material_funds.budgeted) + parseFloat(fundsTotals.labor_funds.budgeted)));
        expect(page.fundsSection.budgeted.material.getText()).toEqual(accounting.formatMoney(fundsTotals.material_funds.budgeted));
        expect(page.fundsSection.budgeted.labor.getText()).toEqual(accounting.formatMoney(fundsTotals.labor_funds.budgeted));

        expect(page.fundsSection.allocated.total.getText()).toEqual(accounting.formatMoney(parseFloat(fundsTotals.material_funds.allocated) + parseFloat(fundsTotals.labor_funds.allocated)));
        expect(page.fundsSection.allocated.material.getText()).toEqual(accounting.formatMoney(fundsTotals.material_funds.allocated));
        expect(page.fundsSection.allocated.labor.getText()).toEqual(accounting.formatMoney(fundsTotals.labor_funds.allocated));

        expect(page.fundsSection.spent.total.getText()).toEqual(accounting.formatMoney(parseFloat(fundsTotals.material_funds.spent) + parseFloat(fundsTotals.labor_funds.spent)));
        expect(page.fundsSection.spent.material.getText()).toEqual(accounting.formatMoney(fundsTotals.material_funds.spent));
        expect(page.fundsSection.spent.labor.getText()).toEqual(accounting.formatMoney(fundsTotals.labor_funds.spent));
      });

      describe('user has access to see savings', function() {
        beforeEach(function() {
          projectPermissionsRequest.response.permissions.can_view_project_savings = true;
        });

        it('shows savings', function() {
          var savingsNumber = parseFloat(fundsTotals.labor_funds.budgeted)
          + parseFloat(fundsTotals.material_funds.budgeted)
          - parseFloat(fundsTotals.labor_funds.spent)
          - parseFloat(fundsTotals.material_funds.spent);

          specHelper.get();
          expect(page.fundsSection.savings.total.getText()).toContain(accounting.formatMoney(savingsNumber));
        });
      });

      describe('user does not have access to see savings', function() {
        beforeEach(function() {
          projectPermissionsRequest.response.permissions.can_view_project_savings = false;
        });

        it('does not show savings', function() {
          specHelper.get();
          expect(page.fundsSection.savings.total.isPresent()).toEqual(false);
        });
      });
    });

    describe('user does not have permissions to see funds totals', function() {
      beforeEach(function() {
        projectPermissionsRequest.response.permissions.can_view_funds_totals = false;
        specHelper.get();
      });

      it('does not show totals', function() {
        expect(page.fundsSection.budgeted.total.isPresent()).toEqual(false);
      });
    });
  });
});
