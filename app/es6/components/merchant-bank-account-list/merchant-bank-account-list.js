'use strict';

import AchAccount from '../../models/ach_account';

class MerchantBankAccountListCtrl {
  constructor(MerchantBankAccounts, Merchants, $state) {
    "ngInject";

    this.accounts = [];
    this.achAccount = new AchAccount();

    this.MerchantBankAccounts = MerchantBankAccounts;
    this.Merchants = Merchants;
    this.$state = $state;
  }

  $onInit() {
    this.getAccounts();
    this.getAchAccount();
  }

  getAccounts() {
    this.MerchantBankAccounts.query(this.merchantId).then((accounts) => {
      this.accounts = accounts;
    });
  }

  getAchAccount() {
    this.Merchants.getAchAccount(this.merchantId).then((achAccount) => {
      this.achAccount = achAccount;
    });
  }

  verifyAccount(bankAccountId) {
    this.$state.go('merchant.bankAccounts.verify', { bankAccountId: bankAccountId });
  }
}

export default {
  controller: MerchantBankAccountListCtrl,
  bindings: {
    merchantId: '='
  },
  templateUrl: 'es6/components/merchant-bank-account-list/merchant-bank-account-list.html'
};
