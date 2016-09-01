'use strict';

import MerchantLocation from '../models/merchant_location';
import User from '../models/user';

export default class MerchantLocations {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query(merchantId) {
    return this.ApiRequest.query(`merchants/${merchantId}/merchant_locations`, 'data', MerchantLocation);
  }

  getMerchantLocation(merchantLocationId) {
    return this.ApiRequest.get(`merchant_locations/${merchantLocationId}`, 'data', MerchantLocation);
  }

  getPotentialPrimaryContacts() {
    return this.ApiRequest.query('merchants/potential_primary_contacts', 'data', User);
  }

  createMerchantLocation(merchantId, merchantLocation) {
    return this.ApiRequest.post(`merchants/${merchantId}/merchant_locations`, { data: merchantLocation });
  }

  updateMerchantLocation(merchantLocation) {
    return this.ApiRequest.put(`merchant_locations/${merchantLocation.id}`, { data: merchantLocation });
  }
}
