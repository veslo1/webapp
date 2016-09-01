'use strict';

var _ = require('lodash');
var faker = require('faker');
var Generators = require('./generators');
var CommittedFundGenerator = require('./committed_fund_generator');

module.exports = {
  newNotification: function(attrs, permissions) {
    permissions = permissions || {};

    var notification = {
      id: faker.random.number(),
      event_type: '',
      record_type: '',
      record: { id: null },
      created_at: '2015-10-27T20:04:43.634Z',
      permissions: permissions
    };

    notification.record_id = notification.record.id;

    if (attrs) {
      notification = _.extend(notification, attrs);
    }

    return notification;
  },
  newCommittedFundNotification: function(attrs, recordAttrs, permissions) {
    var cAttrs = _.extend({
      record_type: 'CommittedFund',
      record: CommittedFundGenerator.new(recordAttrs),
    }, attrs);

    return this.newNotification(cAttrs, permissions);
  },
  newPayoutNotification: function(attrs, recordAttrs, permissions) {
    var cAttrs = _.extend({
      record_type: 'Payout',
      record: Generators.payout.new(recordAttrs),
    }, attrs);

    return this.newNotification(cAttrs, permissions);
  },
  newPayoutApprovalNotification: function(attrs, recordAttrs, permissions) {
    var cAttrs = _.extend({
      record_type: 'PayoutApproval',
      record: Generators.payoutApproval.new(recordAttrs),
    }, attrs);

    return this.newNotification(cAttrs, permissions);
  },
  newCardLoadNotification: function(attrs, recordAttrs, permissions) {
    var cAttrs = _.extend({
      record_type: 'CardLoad',
      record: Generators.cardLoad.new(recordAttrs),
    }, attrs);

    return this.newNotification(cAttrs, permissions);
  },
  newCardLoadApprovalNotification: function(attrs, recordAttrs, permissions) {
    var cAttrs = _.extend({
      record_type: 'CardLoadApproval',
      record: Generators.cardLoadApproval.new(recordAttrs),
    }, attrs);

    return this.newNotification(cAttrs, permissions);
  },
  newMaterialFundsCommittedToMe: function(recordAttrs, permissions) {
    return this.newCommittedFundNotification({ event_type: 'material_funds_committed_to_me' }, recordAttrs, permissions);
  },
  newLopFundsCommittedToMe: function(recordAttrs, permissions) {
    return this.newCommittedFundNotification({ event_type: 'lop_funds_committed_to_me' }, recordAttrs, permissions);
  },
  newFundsAcknowledgedByUser: function(recordAttrs, permissions) {
    return this.newCommittedFundNotification({ event_type: 'funds_acknowledged_by_user' }, recordAttrs, permissions);
  },
  newCardLoad: function(recordAttrs, permissions) {
    return this.newCardLoadNotification({ event_type: 'card_load_requested_by_user' }, recordAttrs, permissions);
  },
  newCardLoadApprovedNotification: function(recordAttrs, permissions) {
    return this.newCardLoadApprovalNotification({ event_type: 'card_load_approved_by_user' }, recordAttrs, permissions);
  },
  newCardLoadAcknowledgedNotification: function(recordAttrs, permissions) {
    return this.newCardLoadNotification({ event_type: 'card_load_acknowledged_by_user' }, recordAttrs, permissions);
  },
  newPayout: function(recordAttrs, permissions) {
    return this.newPayoutNotification({ event_type: 'payout_requested_by_user' }, recordAttrs, permissions);
  },
  newPayoutApprovedNotification: function(recordAttrs, permissions) {
    return this.newPayoutApprovalNotification({ event_type: 'payout_approved_by_user' }, recordAttrs, permissions);
  },
  newPayoutAcknowledgedNotification: function(recordAttrs, permissions) {
    return this.newPayoutNotification({ event_type: 'payout_acknowledged_by_user' }, recordAttrs, permissions);
  },
  newCardRequestedNotification: function() {
    var cAttrs = {
      event_type: 'card_requested_for_user',
      record_type:'ProjectServiceProvider',
      record: null,
      record_id: 2
    }
    return this.newNotification(cAttrs);
  }
};
