'use strict';

import AchAccount from '../models/ach_account';

export default class AchAccounts {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  get() {
    return this.ApiRequest.get('ach_account', 'data', AchAccount);
  }
}
