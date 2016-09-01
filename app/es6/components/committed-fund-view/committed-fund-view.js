'use strict';

import CommittedFund from './../../models/committed_fund';

class CommittedFundView {
  constructor($state, CommittedFunds, Messages) {
    "ngInject";

    this.$state = $state;
    this.CommittedFunds = CommittedFunds;
    this.Messages = Messages;

    this.fund = new CommittedFund();

    this.CommittedFunds.getFund($state.params.id).then((response) => {
      this.fund = new CommittedFund(response.data.committed_fund);
      this.fund.permissions = response.data.permissions;
    });
  }

  canAcknowledge() {
    return this.fund.canAcknowledge();
  }

  acknowledgeFund() {
    this.CommittedFunds.acknowledgeFund(this.$state.params.id).then(() => {
      this.Messages.addSuccess('Committed fund acknowledged.');
      this.$state.go('project.overview.index', { id: this.fund.project_id });
    });
  }
}

export default {
  controller: CommittedFundView,
  templateUrl: 'es6/components/committed-fund-view/committed-fund-view.html'
};
