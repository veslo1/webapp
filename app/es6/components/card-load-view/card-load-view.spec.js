'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.helper('generators');

var project = Generators.project.newProject();
var cardLoad = Generators.cardLoad.new({ project_id: project.id });

var page = requireHelper.page('card-load-view')(cardLoad.id);
var specHelper = requireHelper.specHelper(page);

var permissions = {
  can_approve: false,
  can_acknowledge: false
};

describe('view card load', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('card_load')(cardLoad, permissions),
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
    it('has correct title', function() {
      specHelper.get();
      expect(page.h2Title.getText()).toEqual('Card Load');
    });

    it('shows card load details', function() {
      specHelper.get();

      expect(page.fundAmount.getText()).toEqual(accounting.formatMoney(cardLoad.fund_amount));
      expect(page.toUser.getText()).toEqual(cardLoad.user.full_name);
      expect(page.approvedText.getText()).toEqual('0 of 3 approvals');
      expect(page.acknowledgedText.getText()).toEqual('No');

      expect(page.approveButton.isPresent()).toEqual(false);
    });

    describe('fund is approved', function() {
      beforeEach(function() {
        cardLoad.approved = true;
        specHelper.get();
      });

      it('shows approved text', function() {
        expect(page.approvedText.getText()).toEqual('Yes');
      });
    });

    describe('fund is acknowledged', function() {
      beforeEach(function() {
        cardLoad.acknowledged = true;
        specHelper.get();
      });

      it('shows approved text', function() {
        expect(page.acknowledgedText.getText()).toEqual('Yes');
      });
    });
  });

  describe('fund can be approved', function() {
    beforeEach(function() {
      permissions.can_approve = true;
    });

    it('shows approve button', function() {
      specHelper.get();
      expect(page.approveButton.isPresent()).toEqual(true);
    });

    describe('approving card load', function() {
      beforeEach(function() {
        specHelper.stubRequests([
          requireHelper.request('approve_card_load')(cardLoad.id),
        ]);
        specHelper.get();
      });

      it('can click approve button', function() {
        page.approveButton.click();

        expect(page.toastMessage.getText()).toEqual('Card load approved.');
        expect(page.h2Title.getText()).toEqual(project.name);
      });
    });
  });

  describe('fund can be acknowledged', function() {
    beforeEach(function() {
      permissions.can_acknowledge = true;
    });

    it('shows approve button', function() {
      specHelper.get();
      expect(page.acknowledgeButton.isPresent()).toEqual(true);
    });

    describe('acknowledging card load', function() {
      beforeEach(function() {
        specHelper.stubRequests([
          requireHelper.request('acknowledge_card_load')(cardLoad.id),
        ]);
        specHelper.get();
      });

      it('can click acknowledge button', function() {
        page.acknowledgeButton.click();

        expect(page.toastMessage.getText()).toEqual('Card load acknowledged.');
        expect(page.h2Title.getText()).toEqual(project.name);
      });
    });
  });
});
