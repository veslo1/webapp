'use strict';

import Transaction from '../models/transaction';
import CardTransactionTotal from '../models/card_transaction_total';

class ProjectCardTransactions {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  getTotal(projectId) {
    return this.ApiRequest.get(`projects/${projectId}/card_transactions/total`, 'card_transactions', CardTransactionTotal);
  }

  getCardTransactions(projectId) {
    return this.ApiRequest.query(`projects/${projectId}/card_transactions`, 'card_transactions', Transaction);
  }

  getCardTransactionDetail(projectId, transactionId) {
    return this.ApiRequest.get(`projects/${projectId}/card_transactions/${transactionId}/details`, 'card_transaction', Transaction);
  }
}

export default ProjectCardTransactions;
