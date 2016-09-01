'use strict';

import BankAccount from '../models/bank_account';

export default class MerchantBankAccounts {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query(merchantId) {
    return this.ApiRequest.query(`merchants/${merchantId}/bank_accounts`, 'data', BankAccount);
  }

  create(merchantId, bankAccount) {
    return this.ApiRequest.post(`merchants/${merchantId}/bank_accounts`, { data: bankAccount });
  }

  verify(merchantId, bankAccountId, amount1, amount2) {
    return this.ApiRequest.put(`merchants/${merchantId}/bank_accounts/${bankAccountId}/verifications`, { data: { amount1: amount1, amount2: amount2 } });
  }
}
