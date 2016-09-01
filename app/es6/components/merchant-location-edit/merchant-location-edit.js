'use strict';

class MerchantLocationEdit {
  constructor(CurrentMerchant, MerchantLocations, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.MerchantLocations = MerchantLocations;

    this.merchant = CurrentMerchant.instance();
    this.merchantId = $state.params.id;

    MerchantLocations.getMerchantLocation($state.params.locationId).then((merchantLocation) => {
      this.merchantLocation = merchantLocation;
    });
  }

  updateMerchantLocation(merchantLocation, form) {
    this.MerchantLocations.updateMerchantLocation(merchantLocation).then(() => {
      this.Messages.addSuccess('Merchant Location updated.');
      this.$state.go('merchant.location.view', { id: this.merchant.id, locationId: this.merchantLocation.id });
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  };
}

export default {
  templateUrl: 'es6/components/merchant-location-edit/merchant-location-edit.html',
  controller: MerchantLocationEdit
};
