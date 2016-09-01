'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var fund = Generators.payout.new();

var page = requireHelper.page('payout-view')(fund.id);
var specHelper = requireHelper.specHelper(page);

var permissions = {
  can_approve: false,
  can_acknowledge: false
};

var project = Generators.project.newProject({ id: fund.project_id });

describe('view payout', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('payout')(fund, permissions),
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/notifications')(project.id),
      requireHelper.request('project/financial_overview')(project.id),
    ]);

    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    it('shows payout details', function() {
      specHelper.get();

      expect(page.h2Title.getText()).toEqual('Payout');

      expect(page.fundAmount.getText()).toEqual(accounting.formatMoney(fund.fund_amount));
      expect(page.toUser.getText()).toEqual(fund.user.full_name);
      expect(page.approvedText.getText()).toEqual('0 of 3 approvals');
      expect(page.acknowledgedText.getText()).toEqual('No');

      expect(page.approveButton.isPresent()).toEqual(false);
    });

    describe('fund is approved', function() {
      beforeEach(function() {
        fund.approved = true;
        specHelper.get();
      });

      it('shows approved text', function() {
        expect(page.approvedText.getText()).toEqual('Yes');
      });
    });

    describe('fund is acknowledged', function() {
      beforeEach(function() {
        fund.acknowledged = true;
        specHelper.get();
      });

      it('shows approved text', function() {
        expect(page.acknowledgedText.getText()).toEqual('Yes');
      });
    });
  });

  describe('approving payout', function() {
    beforeEach(function() {
      permissions.can_approve = true;
      specHelper.stubRequests([
        requireHelper.request('approve_payout')(fund.id),
      ]);
      specHelper.get();
    });

    it('can click approve button', function() {
      page.approveButton.click();

      expect(page.toastMessage.getText()).toEqual('Payout approved.');
      expect(page.h2Title.getText()).toEqual(project.name);
    });
  });

  describe('acknowledging payout', function() {
    beforeEach(function() {
      permissions.can_acknowledge = true;
      specHelper.stubRequests([
        requireHelper.request('acknowledge_payout')(fund.id),
      ]);
      specHelper.get();
    });

    it('can click acknowledge button', function() {
      page.acknowledgeButton.click();

      expect(page.toastMessage.getText()).toEqual('Payout acknowledged.');
      expect(page.h2Title.getText()).toEqual(project.name);
    });
  });
});
