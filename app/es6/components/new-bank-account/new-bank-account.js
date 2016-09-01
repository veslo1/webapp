'use strict';

import BankAccount from '../../models/bank_account';

class NewBankAccount {
  constructor(CompanyTypes) {
    "ngInject";
    this.account = new BankAccount();
    this.account_number_confirmation = '';
    this.routing_number_confirmation = '';

    this.accountTypeOptions = [
      { name: 'Checking', value: 'checking' },
      { name: 'Savings', value: 'savings' }
    ];

    this.companyTypes = CompanyTypes.items;
  }

  save() {
    this.onSave({ account: this.account, form: this.form });
  }
}

export default {
  controller: NewBankAccount,
  bindings: {
    onSave: '&',
    showServiceProviderTos: '='
  },
  templateUrl: 'es6/components/new-bank-account/new-bank-account.html'
};
