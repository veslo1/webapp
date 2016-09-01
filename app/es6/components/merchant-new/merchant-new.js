'use strict';

import Merchant from '../../models/merchant';

class MerchantNew {
  constructor(Merchants, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.merchant = new Merchant();
    this.Merchants = Merchants;

    this.potentialPrimaryContacts = [];

    Merchants.getPotentialPrimaryContacts().then((users) => {
      this.potentialPrimaryContacts = users;
    });
  }

  createMerchant() {
    this.Merchants.createMerchant(this.merchant).then(() => {
      this.Messages.addSuccess('Merchant created.');
      this.$state.go('merchants');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  };
}

export default {
  controller: MerchantNew,
  templateUrl: 'es6/components/merchant-new/merchant-new.html'
};
