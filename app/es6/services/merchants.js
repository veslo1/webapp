'use strict';

import Merchant from '../models/merchant';
import User from '../models/user';
import AchAccount from '../models/ach_account';

export class Merchants {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query() {
    return this.ApiRequest.query('merchants', 'data', Merchant);
  }

  getMerchant(merchantId) {
    return this.ApiRequest.get(`merchants/${merchantId}`, 'data', Merchant);
  }

  getPotentialPrimaryContacts() {
    return this.ApiRequest.query('merchants/potential_primary_contacts', 'data', User);
  }

  createMerchant(merchant) {
    return this.ApiRequest.post('merchants', { data: merchant });
  }

  updateMerchant(merchantId, merchant) {
    return this.ApiRequest.put(`merchants/${merchantId}`, { data: merchant });
  }

  getAchAccount(merchantId) {
    return this.ApiRequest.get(`merchants/${merchantId}/ach_account`, 'data', AchAccount);
  }

  createDocumentUrl(merchantId) {
    return `${this.ApiRequest.baseUrl}/merchants/${merchantId}/documents`;
  }
}
