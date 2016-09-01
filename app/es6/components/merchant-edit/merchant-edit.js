'use strict';

class MerchantEdit {
  constructor(CurrentMerchant, Merchants, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.Merchants = Merchants;

    this.CurrentMerchant = CurrentMerchant;

    this.merchant = {};

    this.potentialPrimaryContacts = [];
  }

  $onInit() {
    angular.copy(this.CurrentMerchant.instance(), this.merchant);

    this.Merchants.getPotentialPrimaryContacts().then((users) => {
      this.potentialPrimaryContacts = users;
    });
  }

  updateMerchant() {
    this.Merchants.updateMerchant(this.merchant.id, this.merchant).then(() => {
      this.Messages.addSuccess('Merchant updated.');
      this.CurrentMerchant.load(this.merchant.id);
      this.$state.go('merchant.view', { id: this.merchant.id });
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  };
}

export default {
  templateUrl: 'es6/components/merchant-edit/merchant-edit.html',
  controller: MerchantEdit
};
