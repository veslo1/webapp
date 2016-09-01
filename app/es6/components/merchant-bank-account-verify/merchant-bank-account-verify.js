'use strict';

class MerchantBankAccountVerify {
  constructor(CurrentMerchant, MerchantBankAccounts, Messages, FormErrors, $state) {
    "ngInject";

    this.CurrentMerchant = CurrentMerchant;
    this.MerchantBankAccounts = MerchantBankAccounts;
    this.Messages = Messages;
    this.$state = $state;
    this.FormErrors = FormErrors;
  }

  $onInit() {
    this.merchant = this.CurrentMerchant.instance();
  }

  save(deposits, form, callback) {
    this.MerchantBankAccounts.verify(this.$state.params.id, this.$state.params.bankAccountId, deposits.amount1, deposits.amount2).then((response) => {
      if (callback !== undefined) { callback(); }
      this.Messages.addSuccess('Bank account verified.');
      this.$state.go('merchant.view');
    }, (errors) => {
      if (callback !== undefined) { callback(); }
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  controller: MerchantBankAccountVerify,
  template: `
    <bp-breadcrumbs>
      <bp-breadcrumb link="merchants">Merchants</bp-breadcrumb>
      <bp-breadcrumb link="merchant.view">{{ $ctrl.merchant.name }}</bp-breadcrumb>
      <bp-breadcrumb>Verify Bank Account</bp-breadcrumb>
    </bp-breadcrumbs>
    <bank-account-verify on-save="$ctrl.save(deposits, form, callback)"></bank-account-verify>
  `
};
