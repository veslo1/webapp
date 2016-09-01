'use strict';

class BankAccountDetails {
  constructor(data) {
    data = data || {};

    this.account_name = data.account_name || '';
    this.account_type = data.account_type || '';

    this.routing_number = data.routing_number || '';
    this.routing_number_confirmation = data.routing_number_confirmation || '';

    this.account_number = data.account_number || '';
    this.account_number_confirmation = data.account_number_confirmation || '';

    this.dwolla_ach_agreement = data.dwolla_ach_agreement || '';

    this.accountTypeOptions = [
      { name: 'Checking', value: 'checking' },
      { name: 'Savings', value: 'savings' }
    ];
  }

  dataForCreate() {
    return {
      account_name: this.account_name,
      account_type: this.account_type,
      routing_number: this.routing_number,
      account_number: this.account_number,
      dwolla_ach_agreement: this.dwolla_ach_agreement
    };
  }
}

class BankAccountDetailsNew {
  constructor() {
    this.account = new BankAccountDetails();
  }

  save() {
    this.onSave({ account: this.account.dataForCreate(), form: this.form });
  }
}

export default {
  controller: BankAccountDetailsNew,
  bindings: {
    onSave: '&',
    showServiceProviderTos: '='
  },
  templateUrl: 'es6/components/bank-account-details-new/bank-account-details-new.html'
};
