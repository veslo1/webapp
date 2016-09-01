'use strict';

class Payouts {
  constructor($http, configuration) {
    "ngInject";

    this.apiServerUrl = configuration.apiServer;
    this.$http = $http;
  }

  _url(projectId) {
    return `${this.apiServerUrl}/projects/${projectId}`;
  }

  find(id) {
    return this.$http.get(`${this.apiServerUrl}/payouts/${id}`);
  }

  requestPayout(projectId, fundAmount) {
    var requestUrl = `${this._url(projectId)}/payout_request`;
    return this.$http.post(requestUrl, { payout: { fund_amount: fundAmount } });
  }

  approveFund(payoutId) {
    var url = `${this.apiServerUrl}/payouts/${payoutId}/approvals`;
    return this.$http.put(url);
  }

  acknowledgeFund(payoutId) {
    var url = `${this.apiServerUrl}/payouts/${payoutId}/acknowledgements`;
    return this.$http.put(url);
  }
}

export default Payouts;
