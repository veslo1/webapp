'use strict';

import MerchantLocation from '../../models/merchant_location';

class MerchantLocationNew {
  constructor(CurrentMerchant, MerchantLocations, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.MerchantLocations = MerchantLocations;

    this.merchant = CurrentMerchant.instance();
    this.merchantId = $state.params.id;
    this.merchantLocation = new MerchantLocation();
  }

  createMerchantLocation(merchantLocation, form) {
    this.MerchantLocations.createMerchantLocation(this.merchant.id, merchantLocation).then(() => {
      this.Messages.addSuccess('Merchant Location created.');
      this.$state.go('merchant.view', { id: this.merchant.id });
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  };
}

export default {
  controller: MerchantLocationNew,
  templateUrl: 'es6/components/merchant-location-new/merchant-location-new.html'
};
