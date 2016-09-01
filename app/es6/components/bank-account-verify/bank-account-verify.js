'use strict';

class BankAccountVerify {
  constructor() {
    "ngInject";

    this.deposits = {
      amount1: 0.00,
      amount2: 0.00
    };
    this.processing = false;
    this.defaultButtonText = 'Verify';
    this.buttonText = this.defaultButtonText;
  }

  doneCallback() {
    this.processing = false;
    this.buttonText = this.defaultButtonText;
  }

  save() {
    this.processing = true;
    this.buttonText = 'Verifying...';
    this.onSave({ deposits: this.deposits, form: this.form, callback: () => { this.doneCallback(); } });
  }
}

export default {
  bindings: {
    onSave: '&'
  },
  controller: BankAccountVerify,
  templateUrl: 'es6/components/bank-account-verify/bank-account-verify.html'
};
