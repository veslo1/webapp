'use strict';

import Terminal from '../models/terminal';

class Terminals {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query(merchantLocationId) {
    return this.ApiRequest.query(`merchant_locations/${merchantLocationId}/merchant_terminals`, 'data', Terminal);
  }

  createTerminal(merchantLocationId, terminal) {
    return this.ApiRequest.post(`merchant_locations/${merchantLocationId}/merchant_terminals`, { data: terminal });
  }
}
export default Terminals;
