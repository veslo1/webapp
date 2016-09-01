'use strict';

class NewUserBankAccount {
  constructor(BankAccounts, Messages, $state, FormErrors, currentUser) {
    "ngInject";

    this.BankAccounts = BankAccounts;
    this.Messages = Messages;
    this.$state = $state;
    this.FormErrors = FormErrors;
    this.currentUser = currentUser;
  }

  addBankAccount(account, form) {
    this.BankAccounts.create(account).then(() => {
      this.Messages.addSuccess('Bank account added.');
      this.$state.go('myBankAccounts.overview');
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  controller: NewUserBankAccount,
  template: `<new-bank-account on-save="$ctrl.addBankAccount(account, form)" show-service-provider-tos="$ctrl.currentUser.isServiceProvider()"></new-bank-account>`
};
