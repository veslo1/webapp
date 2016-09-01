'use strict';

class UserBankAccountVerify {
  constructor(BankAccounts, Messages, FormErrors, $state) {
    "ngInject";

    this.BankAccounts = BankAccounts;
    this.Messages = Messages;
    this.$state = $state;
    this.FormErrors = FormErrors;
  }

  save(deposits, form, callback) {
    this.BankAccounts.verify(this.$state.params.id, deposits.amount1, deposits.amount2).then((response) => {
      if (callback !== undefined) { callback(); }
      this.Messages.addSuccess('Bank account verified.');
      this.$state.go('myBankAccounts.overview');
    }, (errors) => {
      if (callback !== undefined) { callback(); }
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  controller: UserBankAccountVerify,
  template: `
    <bp-breadcrumbs>
      <bp-breadcrumb>Verify Bank Account</bp-breadcrumb>
    </bp-breadcrumbs>
    <bank-account-verify on-save="$ctrl.save(deposits, form, callback)"></bank-account-verify>
  `
};
