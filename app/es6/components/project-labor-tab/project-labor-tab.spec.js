'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.helper('generators');
var project = Generators.project.newProject();

var page = requireHelper.page('project-labor-tab')(project.id);
var specHelper = requireHelper.specHelper(page);

var overview = {
  available_to_commit_or_request: "123.51"
};

var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);
var projectPermissions = projectPermissionsRequest.response.permissions;

var payout1 = Generators.payout.new({ approvals: [ { user: {} }]});
var payout2 = Generators.payout.new();

var payouts = [ payout1, payout2 ];

var potentialReceivers = [
  Generators.user.newUser(),
  Generators.user.newUser()
];

var commitment1 = Generators.committedFund.new();
var commitment2 = Generators.committedFund.new({ acknowledged: true });

describe('view project labor tab', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/labor_commitments')(project.id, [ commitment1, commitment2 ]),
      requireHelper.request('project/payouts')(project.id, payouts),
      projectPermissionsRequest,
      requireHelper.request('project/labor_funds_overview')(project.id, overview)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      projectPermissions.can_view_labor_funds = true;
      specHelper.getOnce();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual(project.name);
    });

    it('has correct navbar item', function() {
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
    });

    it('has correct tab selected', function() {
      expect(page.activeSectionsTab.getText()).toEqual('Labor');
    });
  });

  describe('labor commitments', function() {
    beforeEach(function() {
      specHelper.getOnce();
    });

    it('shows committed funds', function() {
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

    it('does not show request commit funds button', function() {
      expect(page.commitFundsButton.isPresent()).toEqual(false);
    });

    describe('user can commit funds', function() {

      beforeEach(function() {
        projectPermissions.can_commit_project_funds = true;

        specHelper.stubRequests([
          requireHelper.request('project/committed_funds/potential_receivers')(project.id, potentialReceivers),
          requireHelper.request('project/commit_lop_funds')(project.id)
        ]);
      });

      describe('project has started', function() {
        beforeEach(function() {
          project.status = 'started';
        });

        it('commits labor funds', function() {
          specHelper.refresh();

          expect(page.availableToCommit.getText()).toEqual(accounting.formatMoney(overview.available_to_commit_or_request));

          page.commitFundsButton.click();
          page.commitFundsForm.commitToOption(potentialReceivers[1].full_name).click();
          page.commitFundsForm.fundAmount.sendKeys(123.00);
          page.commitFundsForm.submitButton.click();
          expect(page.toastMessage.getText()).toEqual('Labor funds committed.');
        });
      });

      describe('project has not started', function() {
        beforeEach(function() {
          project.status = 'not_started';
        });

        it('does not show request commit funds button', function() {
          specHelper.refresh();

          expect(page.commitFundsButton.isPresent()).toEqual(false);
        });
      });
    });
  });

  describe('can view payouts', function() {
    beforeEach(function() {
      projectPermissions.can_view_payouts = true;
      specHelper.getOnce();
    });

    it('shows payouts', function() {
      specHelper.refresh();
      var dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/;

      var detail1 = page.payouts(0);

      expect(detail1.createdAt.getText()).toMatch(dateRegex);
      expect(detail1.userFullName.getText()).toEqual(payout1.user.full_name);
      expect(detail1.statusText.getText()).toEqual('1 of 3 Approvals Required');
      expect(detail1.fundAmount.getText()).toEqual(accounting.formatMoney(payout1.fund_amount));

      var detail2 = page.payouts(1);

      expect(detail2.createdAt.getText()).toMatch(dateRegex);
      expect(detail2.userFullName.getText()).toEqual(payout2.user.full_name);
      expect(detail2.statusText.getText()).toEqual('0 of 3 Approvals Required');
      expect(detail2.fundAmount.getText()).toEqual(accounting.formatMoney(payout2.fund_amount));
    });

    it('does not show request payout button', function() {
      expect(page.requestPayoutButton.isPresent()).toEqual(false);
    });

    describe('requesting payout', function() {
      beforeEach(function() {
        projectPermissions.can_request_payout = true;

        specHelper.stubRequests([
          requireHelper.request('project/payout_request')(project.id)
        ]);
      });

      it('requests payout', function() {
        specHelper.refresh();

        expect(page.availableToRequest.getText()).toEqual(accounting.formatMoney(overview.available_to_commit_or_request));

        page.requestPayoutButton.click();
        page.requestPayoutForm.fundAmount.sendKeys(123.00);
        page.requestPayoutForm.submitButton.click();
        expect(page.toastMessage.getText()).toEqual('Payout requested.');
      });
    });
  });

  describe('cannot view payouts', function() {
    beforeEach(function() {
      projectPermissions.can_view_payouts = false;
      specHelper.getOnce();
    });

    it('does not show payouts section', function() {
      specHelper.refresh();
      expect(page.payoutsSection.isPresent()).toEqual(false);
    });
  });
});
