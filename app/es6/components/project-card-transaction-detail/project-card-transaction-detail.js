'use strict';

class ProjectCardTransactionDetail {
  constructor($stateParams, ProjectCardTransactions) {
    "ngInject";

    ProjectCardTransactions.getCardTransactionDetail(this.project.id, $stateParams.transactionId).then((transaction) => {
      this.transaction = transaction;
    });
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectCardTransactionDetail,
  templateUrl: 'es6/components/project-card-transaction-detail/project-card-transaction-detail.html'
};
