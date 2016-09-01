'use strict';

import BankAccount from '../models/bank_account';

export default class BankAccounts {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query() {
    return this.ApiRequest.query('bank_accounts', 'data', BankAccount);
  }

  create(bankAccount) {
    return this.ApiRequest.post('bank_accounts', { data: bankAccount });
  }

  verify(bankAccountId, amount1, amount2) {
    return this.ApiRequest.put(`bank_accounts/${bankAccountId}/verifications`, { data: { amount1: amount1, amount2: amount2 } });
  }
}
