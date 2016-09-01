'use strict';

import Payout from '../../models/payout';

class PayoutView {
  constructor($state, Payouts, Messages) {
    "ngInject";

    this.$state = $state;
    this.Payouts = Payouts;
    this.Messages = Messages;

    this.fund = {};
    this.permissions = {};

    Payouts.find($state.params.id).then((response) => {
      this.fund = new Payout(response.data.data);
      this.permissions = response.data.permissions;
    });
  }

  canApprove() {
    return this.permissions.can_approve === true;
  }

  canAcknowledge() {
    return this.permissions.can_acknowledge === true;
  }

  approveFund() {
    this.Payouts.approveFund(this.fund.id).then(() => {
      this.Messages.addSuccess('Payout approved.');
      this.$state.go('project.overview.index', { id: this.fund.project_id });
    });
  };

  acknowledgeFund() {
    this.Payouts.acknowledgeFund(this.fund.id).then(() => {
      this.Messages.addSuccess('Payout acknowledged.');
      this.$state.go('project.overview.index', { id: this.fund.project_id });
    });
  };
}

export default {
  controller: PayoutView,
  templateUrl: 'es6/components/payout-view/payout-view.html'
};
