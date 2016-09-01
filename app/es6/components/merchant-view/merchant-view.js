'use strict';

class MerchantView {
  constructor(CurrentMerchant, $stateParams, MerchantLocations, currentUser) {
    "ngInject";

    this.currentUser = currentUser;
    this.merchant = CurrentMerchant.instance();
    this.merchantId = $stateParams.id;
    this.MerchantLocations = MerchantLocations;

    this.locations = [];
  }

  $onInit() {
    this.MerchantLocations.query(this.merchantId).then((merchantLocations) => {
      this.locations = merchantLocations;
    });
  }

  canManageMerchants() {
    return this.currentUser.permissions.canManageMerchants();
  }
}

export default {
  controller: MerchantView,
  templateUrl: 'es6/components/merchant-view/merchant-view.html'
};
