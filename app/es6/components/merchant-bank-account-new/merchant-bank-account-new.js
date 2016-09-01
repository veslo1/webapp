'use strict';

class MerchantBankAccountNew {
  constructor(CurrentMerchant, MerchantBankAccounts, Messages, $state, FormErrors) {
    "ngInject";

    this.MerchantBankAccounts = MerchantBankAccounts;
    this.Messages = Messages;
    this.$state = $state;
    this.merchant = CurrentMerchant.instance();
    this.FormErrors = FormErrors;
  }

  addBankAccount(account, form) {
    this.MerchantBankAccounts.create(this.merchant.id, account).then(() => {
      this.Messages.addSuccess('Bank account added.');
      this.$state.go('merchant.view');
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  controller: MerchantBankAccountNew,
  template: `
  <bp-breadcrumbs>
    <bp-breadcrumb link="merchants">Merchants</bp-breadcrumb>
    <bp-breadcrumb link="merchant.view">{{ $ctrl.merchant.name }}</bp-breadcrumb>
    <bp-breadcrumb>New Bank Account</bp-breadcrumb>
  </bp-breadcrumbs>
  <new-bank-account on-save="$ctrl.addBankAccount(account, form)"></new-bank-account>
  `
};
