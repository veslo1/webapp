'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();
var NotificationGenerator = requireHelper.generator('notification');
var project = Generators.project.newProject();

var page = requireHelper.page('project')(project.id);
var specHelper = requireHelper.specHelper(page);

var projectRequest = requireHelper.request('project')(project);
var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);

var financialOverviewRequest = requireHelper.request('project/financial_overview')(project.id);

var materialFundsCommittedToMeNotification = NotificationGenerator.newMaterialFundsCommittedToMe({}, { can_acknowledge: true });

var lopFundsCommittedToMeNotification = NotificationGenerator.newLopFundsCommittedToMe({}, { can_acknowledge: true });

var approvedFundsCommittedToMeNotification = NotificationGenerator.newLopFundsCommittedToMe({}, { can_acknowledge: false });

var fundsAcknowledgedByUserNotification = NotificationGenerator.newFundsAcknowledgedByUser({}, { can_acknowledge: false });

var cardLoadNotification = NotificationGenerator.newCardLoad({}, { can_approve: true });

var payoutNotification = NotificationGenerator.newPayout();

var cardLoadApprovedNotification = NotificationGenerator.newCardLoadApprovedNotification({}, { can_acknowledge: true });

var payoutApprovedNotification = NotificationGenerator.newPayoutApprovedNotification();

var cardLoadAcknowledgedNotification = NotificationGenerator.newCardLoadAcknowledgedNotification();

var payoutAcknowledgedNotification = NotificationGenerator.newPayoutAcknowledgedNotification();

var cardRequestedNotification = NotificationGenerator.newCardRequestedNotification();

var notifications = [
  materialFundsCommittedToMeNotification,
  lopFundsCommittedToMeNotification,
  approvedFundsCommittedToMeNotification,
  fundsAcknowledgedByUserNotification,
  cardLoadNotification,
  payoutNotification,
  cardLoadApprovedNotification,
  payoutApprovedNotification,
  cardLoadAcknowledgedNotification,
  payoutAcknowledgedNotification,
  cardRequestedNotification
];

var notificationsRequest = requireHelper.request('project/notifications')(project.id);

notificationsRequest.response.notifications = notifications;

var expectedNotification1 = materialFundsCommittedToMeNotification.record.from_user.full_name + ' committed ' + accounting.formatMoney(materialFundsCommittedToMeNotification.record.fund_amount) + ' in Material Funds.';
var expectedNotification2 = lopFundsCommittedToMeNotification.record.from_user.full_name + ' committed ' + accounting.formatMoney(lopFundsCommittedToMeNotification.record.fund_amount) + ' in LOP Funds.';
var expectedNotification3 = approvedFundsCommittedToMeNotification.record.from_user.full_name + ' committed ' + accounting.formatMoney(approvedFundsCommittedToMeNotification.record.fund_amount) + ' in LOP Funds.';
var expectedNotification4 = fundsAcknowledgedByUserNotification.record.to_user.full_name + ' acknowledged ' + accounting.formatMoney(fundsAcknowledgedByUserNotification.record.fund_amount) + ' in Material Funds.';
var expectedNotification5 = cardLoadNotification.record.user.full_name + ' requested a card load for ' + accounting.formatMoney(cardLoadNotification.record.fund_amount);
var expectedNotification6 = payoutNotification.record.user.full_name + ' requested a payout for ' + accounting.formatMoney(payoutNotification.record.fund_amount);
var expectedNotification7 = cardLoadApprovedNotification.record.user.full_name + ' approved card load of ' + accounting.formatMoney(cardLoadApprovedNotification.record.card_load.fund_amount);
var expectedNotification8 = payoutApprovedNotification.record.user.full_name + ' approved payout of ' + accounting.formatMoney(payoutApprovedNotification.record.payout.fund_amount);
var expectedNotification9 = cardLoadAcknowledgedNotification.record.user.full_name + ' acknowledged card load of ' + accounting.formatMoney(cardLoadAcknowledgedNotification.record.fund_amount);
var expectedNotification10 = payoutAcknowledgedNotification.record.user.full_name + ' acknowledged payout of ' + accounting.formatMoney(payoutAcknowledgedNotification.record.fund_amount);

var expectedNotification11 = "A card has been requested for you."

var expectedNotifications =  [
  expectedNotification1,
  expectedNotification2,
  expectedNotification3,
  expectedNotification4,
  expectedNotification5,
  expectedNotification6,
  expectedNotification7,
  expectedNotification8,
  expectedNotification9,
  expectedNotification10,
  expectedNotification11
];

describe('view project notifications', function() {
  beforeEach(function() {
    projectPermissionsRequest.response.permissions.can_view_project_notifications = true;

    specHelper.stubRequests([
      projectRequest,
      projectPermissionsRequest,
      notificationsRequest,
      financialOverviewRequest
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('there are notifications', function() {
    it('has expected notifications', function() {
      specHelper.get();

      expect(page.notificationsTitle.getText()).toEqual('Notifications');
      expect(page.notificationsEvents.count()).toEqual(notifications.length);

      var notification1 = page.notificationsEvents.get(0);
      var notification2 = page.notificationsEvents.get(1);
      var notification3 = page.notificationsEvents.get(2);
      var notification4 = page.notificationsEvents.get(3);
      var notification5 = page.notificationsEvents.get(4);
      var notification6 = page.notificationsEvents.get(5);
      var notification7 = page.notificationsEvents.get(6);
      var notification8 = page.notificationsEvents.get(7);
      var notification9 = page.notificationsEvents.get(8);
      var notification10 = page.notificationsEvents.get(9);
      var notification11 = page.notificationsEvents.get(10);

      expect(notification1.getText()).toContain(expectedNotifications[0]);
      expect(notification1.element(by.css('.acknowledge-fund')).isPresent()).toBe(true);
      expect(notification1.element(by.css('.dismiss-notification')).isPresent()).toBe(false);

      expect(notification2.getText()).toContain(expectedNotifications[1]);
      expect(notification2.element(by.css('.acknowledge-fund')).isPresent()).toBe(true);
      expect(notification2.element(by.css('.dismiss-notification')).isPresent()).toBe(false);

      expect(notification3.getText()).toContain(expectedNotifications[2]);
      expect(notification3.element(by.css('.acknowledge-fund')).isPresent()).toBe(false);
      expect(notification3.element(by.css('.dismiss-notification')).isPresent()).toBe(true);

      expect(notification4.getText()).toContain(expectedNotifications[3]);
      expect(notification4.element(by.css('.acknowledge-fund')).isPresent()).toBe(false);
      expect(notification4.element(by.css('.dismiss-notification')).isPresent()).toBe(true);

      expect(notification5.getText()).toContain(expectedNotifications[4]);
      expect(notification5.element(by.css('.approve-card-load')).isPresent()).toBe(true);
      expect(notification5.element(by.css('.dismiss-notification')).isPresent()).toBe(false);

      expect(notification6.getText()).toContain(expectedNotifications[5]);
      expect(notification6.element(by.css('.approve-payout')).isPresent()).toBe(false);
      expect(notification6.element(by.css('.dismiss-notification')).isPresent()).toBe(true);

      expect(notification7.getText()).toContain(expectedNotifications[6]);
      expect(notification7.element(by.css('.approve-card-load')).isPresent()).toBe(false);
      expect(notification7.element(by.css('.acknowledge-card-load')).isPresent()).toBe(true);
      expect(notification7.element(by.css('.dismiss-notification')).isPresent()).toBe(false);

      expect(notification8.getText()).toContain(expectedNotifications[7]);
      expect(notification8.element(by.css('.approve-payout')).isPresent()).toBe(false);
      expect(notification8.element(by.css('.acknowledge-payout')).isPresent()).toBe(false);
      expect(notification8.element(by.css('.dismiss-notification')).isPresent()).toBe(true);

      expect(notification9.getText()).toContain(expectedNotifications[8]);
      expect(notification9.element(by.css('.approve-payout')).isPresent()).toBe(false);
      expect(notification9.element(by.css('.acknowledge-payout')).isPresent()).toBe(false);
      expect(notification9.element(by.css('.dismiss-notification')).isPresent()).toBe(true);

      expect(notification10.getText()).toContain(expectedNotifications[9]);
      expect(notification10.element(by.css('.approve-payout')).isPresent()).toBe(false);
      expect(notification10.element(by.css('.acknowledge-payout')).isPresent()).toBe(false);
      expect(notification10.element(by.css('.dismiss-notification')).isPresent()).toBe(true);

      expect(notification11.getText()).toContain(expectedNotifications[10]);
      expect(notification11.element(by.css('.approve-payout')).isPresent()).toBe(false);
      expect(notification11.element(by.css('.acknowledge-payout')).isPresent()).toBe(false);
      expect(notification11.element(by.css('.dismiss-notification')).isPresent()).toBe(true);
    });

    describe('dismissing notification', function() {
      var dismissNotificationRequest = requireHelper.request('dismiss_notification')(approvedFundsCommittedToMeNotification.id);

      beforeEach(function() {
        specHelper.stubRequest(dismissNotificationRequest);
      });

      it('dismisses notification', function() {
        specHelper.get();

        var notification = page.notificationsEvents.get(2);
        var dismissButton = notification.element(by.css('.dismiss-notification'));

        dismissButton.click();

        expect(page.notificationsEvents.count()).toEqual(notifications.length - 1);
      });
    });

    describe('clicking acknowledge button', function() {
      var fund = Generators.committedFund.new({ id: materialFundsCommittedToMeNotification.record.id });

      beforeEach(function() {
        specHelper.stubRequests([
          requireHelper.request('committed_fund')(fund)
        ]);
      });

      it('goes to committed fund page', function() {
        specHelper.get();

        var notification1 = page.notificationsEvents.get(0);
        var acknowledgeButton = notification1.element(by.css('.acknowledge-fund'));

        acknowledgeButton.click();

        expect(page.h2Title.getText()).toEqual('Committed Fund');
      });
    });

    describe('clicking approve button', function() {
      beforeEach(function() {
        specHelper.stubRequests([
          requireHelper.request('card_load')(cardLoadNotification.record)
        ]);
      });

      it('goes to committed fund page', function() {
        specHelper.get();

        var notification = page.notificationsEvents.get(4);
        var approveButton = notification.element(by.css('.approve-card-load'));

        approveButton.click();

        expect(page.h2Title.getText()).toEqual('Card Load');
      });
    });

    describe('clicking acknowledge button', function() {
      beforeEach(function() {
        specHelper.stubRequests([
          requireHelper.request('card_load')(cardLoadApprovedNotification.record.card_load)
        ]);
      });

      it('goes to committed fund page', function() {
        specHelper.get();

        var notification = page.notificationsEvents.get(6);
        var approveButton = notification.element(by.css('.acknowledge-card-load'));

        approveButton.click();

        expect(page.h2Title.getText()).toEqual('Card Load');
      });
    });
  });

  describe('user cannot view project notifications', function() {
    beforeEach(function() {
      projectPermissionsRequest.response.permissions.can_view_project_notifications = false;
      specHelper.get();
    });

    it('does not show notifications section', function() {
      expect(page.notificationsTitle.isPresent()).toBe(false);
    });
  });

  describe('there are no notifications', function() {
    beforeEach(function() {
      notificationsRequest.response.notifications = [];
      specHelper.get();
    });

    it('does not show notifications section', function() {
      expect(page.notificationsTitle.isPresent()).toBe(false);
    });
  });
});
