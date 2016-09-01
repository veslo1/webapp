'use strict';

import CardLoad from './../../models/card_load';

class CommitMaterialFunds {
  constructor(CommittedFunds, Projects, Messages, FormErrors) {
    "ngInject";

    this.Projects = Projects;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.potentialReceivers = [];

    this.newCommitment = new CardLoad();

    CommittedFunds.getPotentialReceivers(this.project.id).then((response) => {
      this.potentialReceivers = response.data.users;
    });
  }

  commitFunds() {
    this.Projects.commitMaterialFunds(
      this.project.id,
      this.newCommitment.fund_amount,
      this.newCommitment.user_id
    ).then(() => {
      this.Messages.addSuccess('Material funds committed.');

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
  controller: CommitMaterialFunds,
  templateUrl: 'es6/components/commit-material-funds/commit-material-funds.html'
};
