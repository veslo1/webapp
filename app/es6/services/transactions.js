'use strict';

import Transaction from '../models/transaction';

export class Transactions {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query(page) {
    var queryUrl = 'transactions';

    if (page !== undefined && parseInt(page, 10) > 1) {
      queryUrl = `${queryUrl}?page=${page}`;
    }

    return this.ApiRequest.query(queryUrl, 'transactions', Transaction);
  }

  getTransaction(transactionId) {
    return this.ApiRequest.get(`transactions/${transactionId}`, 'transaction', Transaction);
  }

  createTransactionLineItem(lineItem) {
    return this.ApiRequest.post(`transactions/${lineItem.transaction_id}/line_items`, { line_item: lineItem });
  }
}
