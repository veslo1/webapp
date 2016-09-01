'use strict';

import Payout from './../../models/payout';

class PayoutRequestForm {
  constructor(Payouts, Messages, FormErrors) {
    "ngInject";

    this.Payouts = Payouts;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.potentialReceivers = [];

    this.newPayout = new Payout();
  }

  requestPayout() {
    this.Payouts.requestPayout(
      this.project.id,
      this.newPayout.fund_amount
    ).then(() => {
      this.Messages.addSuccess('Payout requested.');

      if (this.formClosed) {
        this.formClosed();
      }
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  };
}

export default {
  bindings: {
    project: '=',
    availableAmount: '=',
    formClosed: '='
  },
  controller: PayoutRequestForm,
  templateUrl: 'es6/components/payout-request-form/payout-request-form.html'
};
