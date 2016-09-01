'use strict';

import CardLoad from './../../models/card_load';

class CardLoadRequestForm {
  constructor(CardLoads, Messages, FormErrors) {
    "ngInject";

    this.CardLoads = CardLoads;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.potentialReceivers = [];

    this.newCardLoad = new CardLoad();
  }

  requestCardLoad() {
    this.CardLoads.requestCardLoad(
      this.project.id,
      this.newCardLoad.fund_amount
    ).then(() => {
      this.Messages.addSuccess('Card load requested.');

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
  controller: CardLoadRequestForm,
  templateUrl: 'es6/components/card-load-request-form/card-load-request-form.html'
};
