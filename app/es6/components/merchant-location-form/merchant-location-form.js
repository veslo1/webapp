'use strict';

class MerchantLocationForm {
  constructor(MerchantLocations, MerchantBankAccounts) {
    "ngInject";

    this.MerchantLocations = MerchantLocations;
    this.MerchantBankAccounts = MerchantBankAccounts;
    this.potentialPrimaryContacts = [];
    this.potentialBankAccounts = [];
  }

  $onInit() {
    if (!this.buttonLabel) {
      this.buttonLabel = 'Update';
    }

    this.MerchantLocations.getPotentialPrimaryContacts().then((users) => {
      this.potentialPrimaryContacts = users;
    });

    this.MerchantBankAccounts.query(this.merchantId).then((accounts) => {
      this.potentialBankAccounts = accounts;
    });
  }

  onSubmit() {
    this.onSave({ merchantLocation: this.merchantLocation, form: this.form });
  }
}

export default {
  controller: MerchantLocationForm,
  bindings: {
    onSave: '&',
    merchantId: '=',
    merchantLocation: '=',
    buttonLabel: '@?'
  },
  templateUrl: 'es6/components/merchant-location-form/merchant-location-form.html'
};
