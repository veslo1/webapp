'use strict';

class TransactionsCtrl {
  constructor(Transactions, $stateParams) {
    "ngInject";

    this.Transactions = Transactions;
    this.$stateParams = $stateParams;

    this.transactions = [];
  }

  $onInit() {
    this.currentPage = parseInt(this.$stateParams.page, 10) || 1;
    this.perPage = 50;

    this.Transactions.query(this.currentPage).then((transactions) => {
      this.transactions = transactions;
    });
  }

  isPreviousEnabled() {
    return this.currentPage > 1;
  }

  isNextEnabled() {
    return this.transactions.length >= this.perPage;
  }
}

export default {
  templateUrl: 'es6/components/transactions-list/transactions-list.html',
  controller: TransactionsCtrl
};
