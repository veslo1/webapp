'use strict';

class MerchantLocationView {
  constructor(CurrentMerchant, $stateParams, MerchantLocations, currentUser) {
    "ngInject";

    this.currentUser = currentUser;

    this.merchantId = $stateParams.id;
    this.merchantLocationId = $stateParams.locationId;

    this.merchant = CurrentMerchant.instance();
    this.MerchantLocations = MerchantLocations;
  }

  $onInit() {
    this.MerchantLocations.getMerchantLocation(this.merchantLocationId).then((merchantLocation) => {
      this.merchantLocation = merchantLocation;
    });
  }

  canManageMerchants() {
    return this.currentUser.permissions.canManageMerchants();
  }
}

export default {
  controller: MerchantLocationView,
  templateUrl: 'es6/components/merchant-location-view/merchant-location-view.html'
};
