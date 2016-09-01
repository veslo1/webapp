'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var fund = Generators.committedFund.new();

var page = requireHelper.page('committed-fund-view')(fund.id);
var specHelper = requireHelper.specHelper(page);

var permissions = {
  can_acknowledge: false
};

var committedFundRequest = requireHelper.request('committed_fund')(fund, permissions);

describe('view committed fund', function() {
  beforeEach(function() {
    specHelper.stubRequest(committedFundRequest);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('shows committed fund details', function() {
      expect(page.h2Title.getText()).toEqual('Committed Fund');

      expect(page.fundAmount.getText()).toEqual(accounting.formatMoney(fund.fund_amount));
      expect(page.fundType.getText()).toEqual('Material Funds');
      expect(page.toUser.getText()).toEqual(fund.to_user.full_name);
      expect(page.fromUser.getText()).toEqual(fund.from_user.full_name);
      expect(page.acknowledgedText.getText()).toEqual('No');

      expect(page.acknowledgeButton.isPresent()).toEqual(false);
    });
  });

  describe('fund can be acknowledged', function() {
    beforeEach(function() {
      permissions.can_acknowledge = true;
    });

    it('shows acknowledge button', function() {
      specHelper.get();

      expect(page.acknowledgeButton.isPresent()).toEqual(true);
    });

    describe('acknowledging fund', function() {
      var project = Generators.project.newProject({ id: fund.project_id });
      var requestHelper = requireHelper.helper('request_helper');
      var acknowledgeCommittedFundRequest = requireHelper.request('acknowledge_committed_fund')(fund.id);

      beforeEach(function() {
        specHelper.stubRequest(acknowledgeCommittedFundRequest);
        specHelper.stubRequests(requestHelper.requestsForProject(project));
        specHelper.get();
      });

      it('acknowledges fund', function() {
        page.acknowledgeButton.click();

        expect(page.toastMessage.getText()).toEqual('Committed fund acknowledged.');
        expect(page.h2Title.getText()).toEqual(project.name);
      });
    });
  });

  describe('fund is already acknowledged', function() {
    beforeEach(function() {
      fund.acknowledged = true;
    });

    it('shows already acknowledged status text', function() {
      specHelper.get();
      expect(page.acknowledgedText.getText()).toEqual('Yes');
    });
  });
});
