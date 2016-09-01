'use strict';

class MerchantsCtrl {
  constructor(Merchants, currentUser) {
    "ngInject";

    this.currentUser = currentUser;
    this.merchants = [];

    Merchants.query().then((merchants) => {
      this.merchants = merchants;
    });
  }

  canManageMerchants() {
    return this.currentUser.permissions.canManageMerchants();
  }
}

export default {
  templateUrl: 'es6/components/merchants-list/merchants-list.html',
  controller: MerchantsCtrl,
  controllerAs: 'merchantsIndex'
};
