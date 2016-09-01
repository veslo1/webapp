'use strict';

import AchAccount from '../../models/ach_account';

class MyBankAccounts {
  constructor(BankAccounts, AchAccounts, $state) {
    "ngInject";

    this.accounts = [];
    this.achAccount = new AchAccount();

    this.$state = $state;
    this.BankAccounts = BankAccounts;
    this.AchAccounts = AchAccounts;
  }

  $onInit() {
    this.BankAccounts.query().then((accounts) => {
      this.accounts = accounts;
    });

    this.AchAccounts.get().then((achAccount) => {
      this.achAccount = achAccount;
    });
  }

  verifyAccount(bankAccountId) {
    this.$state.go('myBankAccounts.verify', { id: bankAccountId });
  }
}

export default {
  controller: MyBankAccounts,
  templateUrl: 'es6/components/my-bank-accounts/my-bank-accounts.html'
};
