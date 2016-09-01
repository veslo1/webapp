'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.helper('generators');
var project = Generators.project.newProject();

var page = requireHelper.page('project-materials-tab')(project.id);
var specHelper = requireHelper.specHelper(page);

var overview = {
  available_to_commit_or_request: "123.51"
};

var cardTransaction1 = Generators.cardTransaction.new({ project: project });
var cardTransaction2 = Generators.cardTransaction.new({ project: project });

var cardTransactionsResponse = [ cardTransaction1, cardTransaction2 ];

var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);
var projectPermissions = projectPermissionsRequest.response.permissions;

var cardLoad1 = Generators.cardLoad.new({ approvals: [ { user: {} }]});
var cardLoad2 = Generators.cardLoad.new();

var cardLoads = [ cardLoad1, cardLoad2 ];

var potentialReceivers = [
  Generators.user.newUser(),
  Generators.user.newUser()
];

var commitment1 = Generators.committedFund.new();
var commitment2 = Generators.committedFund.new({ acknowledged: true });

describe('view project material tab', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/material_commitments')(project.id, [ commitment1, commitment2 ]),
      requireHelper.request('project/card_loads')(project.id, cardLoads),
      projectPermissionsRequest,
      requireHelper.request('project_card_transactions')(project.id, cardTransactionsResponse),
      requireHelper.request('project/material_funds_overview')(project.id, overview)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      projectPermissions.can_view_material_funds = true;
      specHelper.get();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual(project.name);
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
      expect(page.activeSectionsTab.getText()).toEqual('Materials');
    });
  });

  describe('material commitments', function() {
    it('shows committed funds', function() {
      specHelper.get();

      expect(page.commitMaterialFundsButton.isPresent()).toEqual(false);

      var dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;

      var detail1 = page.commitments(0);

      expect(detail1.createdAt.getText()).toMatch(dateRegex);
      expect(detail1.toUser.getText()).toEqual(commitment1.to_user.full_name);
      expect(detail1.byUser.getText()).toEqual(commitment1.from_user.full_name);
      expect(detail1.statusText.getText()).toEqual('Pending');
      expect(detail1.fundAmount.getText()).toEqual(accounting.formatMoney(commitment1.fund_amount));

      var detail2 = page.commitments(1);

      expect(detail2.createdAt.getText()).toMatch(dateRegex);
      expect(detail2.toUser.getText()).toEqual(commitment2.to_user.full_name);
      expect(detail2.byUser.getText()).toEqual(commitment2.from_user.full_name);
      expect(detail2.statusText.getText()).toEqual('Acknowledged');
      expect(detail2.fundAmount.getText()).toEqual(accounting.formatMoney(commitment2.fund_amount));
    });

    describe('user can commit funds', function() {
      beforeEach(function() {
        projectPermissions.can_commit_project_funds = true;

        specHelper.stubRequests([
          requireHelper.request('project/committed_funds/potential_receivers')(project.id, potentialReceivers),
          requireHelper.request('project/commit_material_funds')(project.id)
        ]);
      });

      describe('project has started', function() {
        beforeEach(function() {
          project.status = 'started';
        });

        it('commits material funds', function() {
          specHelper.get();

          expect(page.availableToCommit.getText()).toEqual(accounting.formatMoney(overview.available_to_commit_or_request));

          page.commitMaterialFundsButton.click();
          page.commitMaterialFundsForm.commitToOption(potentialReceivers[1].full_name).click();
          page.commitMaterialFundsForm.fundAmount.sendKeys(123.00);
          page.commitMaterialFundsForm.submitButton.click();
          expect(page.toastMessage.getText()).toEqual('Material funds committed.');
        });
      });

      describe('project has NOT started', function() {
        beforeEach(function() {
          project.status = 'not_started';
        });

        it('does not show commit funds button', function() {
          specHelper.get();
          expect(page.commitMaterialFundsButton.isPresent()).toEqual(false);
        });
      });
    });
  });

  describe('can view card loads', function() {
    beforeEach(function() {
      projectPermissions.can_view_card_loads = true;
    });

    it('shows card loads', function() {
      specHelper.get();

      expect(page.requestCardLoadButton.isPresent()).toEqual(false);

      var dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;

      var detail1 = page.cardLoads(0);

      expect(detail1.createdAt.getText()).toMatch(dateRegex);
      expect(detail1.userFullName.getText()).toEqual(cardLoad1.user.full_name);
      expect(detail1.statusText.getText()).toEqual('1 of 3 Approvals Required');
      expect(detail1.fundAmount.getText()).toEqual(accounting.formatMoney(cardLoad1.fund_amount));

      var detail2 = page.cardLoads(1);

      expect(detail2.createdAt.getText()).toMatch(dateRegex);
      expect(detail2.userFullName.getText()).toEqual(cardLoad2.user.full_name);
      expect(detail2.statusText.getText()).toEqual('0 of 3 Approvals Required');
      expect(detail2.fundAmount.getText()).toEqual(accounting.formatMoney(cardLoad2.fund_amount));
    });

    describe('requesting card load', function() {
      beforeEach(function() {
        projectPermissions.can_request_card_load = true;

        specHelper.stubRequests([
          requireHelper.request('project/card_load_request')(project.id)
        ]);
      });

      it('requests card load', function() {
        specHelper.get();

        expect(page.availableToRequest.getText()).toEqual(accounting.formatMoney(overview.available_to_commit_or_request));

        page.requestCardLoadButton.click();
        page.requestCardLoadForm.fundAmount.sendKeys(123.00);
        page.requestCardLoadForm.submitButton.click();
        expect(page.toastMessage.getText()).toEqual('Card load requested.');
      });
    });
  });

  describe('cannot view card loads', function() {
    beforeEach(function() {
      projectPermissions.can_view_card_loads = false;
    });

    it('does not show card load section', function() {
      specHelper.get();
      expect(page.cardLoadsSection.isPresent()).toEqual(false);
    });
  });

  describe('can view project card transactions', function() {
    var transactionTotal = 12456.34;
    var cardTransactionEl1 = page.cardTransactions(0);
    var cardTransactionEl2 = page.cardTransactions(1);

    beforeEach(function() {
      projectPermissions.can_view_project_card_transactions = true;

      specHelper.stubRequests([
        requireHelper.request('project_card_transactions_total')(project.id, transactionTotal),
        requireHelper.request('project_card_transaction_detail')(project.id, cardTransaction1)
      ]);

      specHelper.get();
    });

    it('shows project card transactions', function() {
      expect(page.transactionTotal.getText()).toEqual(accounting.formatMoney(transactionTotal));

      var dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;

      expect(cardTransactionEl1.transactedAt.getText()).toMatch(dateRegex);
      expect(cardTransactionEl1.merchantName.getText()).toEqual(cardTransaction1.merchant.name);
      expect(cardTransactionEl1.transactionAmount.getText()).toEqual(accounting.formatMoney(cardTransaction1.amount));

      expect(cardTransactionEl2.transactedAt.getText()).toMatch(dateRegex);
      expect(cardTransactionEl2.merchantName.getText()).toEqual(cardTransaction2.merchant.name);
      expect(cardTransactionEl2.transactionAmount.getText()).toEqual(accounting.formatMoney(cardTransaction2.amount));
    });

    it('allows me to navigate to card transaction receipt data', function() {
      cardTransactionEl1.merchantNameLink.click();
      expect(page.detailsHeader.getText()).toEqual('Materials / Card Transaction #' + cardTransaction1.id);
    });
  });

  describe('cannot view card transactions', function() {
    beforeEach(function() {
      projectPermissions.can_view_project_card_transactions = false;
    });

    it('does not show card load section', function() {
      specHelper.get();
      expect(page.cardTransactionsSection.isPresent()).toEqual(false);
    });
  });
});
