'use strict';

import Payout from './../../models/payout';

class CommitLaborFunds {
  constructor(CommittedFunds, Projects, Messages, FormErrors) {
    "ngInject";

    this.Projects = Projects;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.potentialReceivers = [];

    this.newCommitment = new Payout();

    CommittedFunds.getPotentialReceivers(this.project.id).then((response) => {
      this.potentialReceivers = response.data.users;
    });
  }

  commitFunds() {
    this.Projects.commitLaborFunds(
      this.project.id,
      this.newCommitment.fund_amount,
      this.newCommitment.user_id
    ).then(() => {
      this.Messages.addSuccess('Labor funds committed.');

      if (this.formClosed) {
        this.formClosed();
      }
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  };
}

export default {
  bindings: {
    project: '=',
    availableAmount: '=',
    formClosed: '='
  },
  controller: CommitLaborFunds,
  templateUrl: 'es6/components/commit-labor-funds/commit-labor-funds.html'
};
