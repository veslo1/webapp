'use strict';

class ProjectCardTransactionsList {
  constructor($stateParams, ProjectCardTransactions) {
    "ngInject";

    this.transactions = [];
    this.transactionTotal = 0.0;

    ProjectCardTransactions.getCardTransactions(this.project.id).then((transactions) => {
      this.transactions = transactions;
    });

    ProjectCardTransactions.getTotal(this.project.id).then((cardTransactionTotal) => {
      this.transactionTotal = cardTransactionTotal.total;
    });
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectCardTransactionsList,
  templateUrl: 'es6/components/project-card-transactions-list/project-card-transactions-list.html'
};
