'use strict';

class CardLoads {
  constructor($http, configuration) {
    "ngInject";

    this.apiServerUrl = configuration.apiServer;
    this.$http = $http;
  }

  _url(projectId) {
    return `${this.apiServerUrl}/projects/${projectId}`;
  }

  getCardLoad(cardLoadId) {
    return this.$http.get(`${this.apiServerUrl}/card_loads/${cardLoadId}`);
  }

  requestCardLoad(projectId, fundAmount) {
    var requestUrl = `${this._url(projectId)}/card_load_request`;
    return this.$http.post(requestUrl, { card_load: { fund_amount: fundAmount } });
  }

  approveFund(cardLoadId) {
    var url = `${this.apiServerUrl}/card_loads/${cardLoadId}/approvals`;
    return this.$http.put(url);
  }

  acknowledgeFund(cardLoadId) {
    var url = `${this.apiServerUrl}/card_loads/${cardLoadId}/acknowledgements`;
    return this.$http.put(url);
  }
}

export default CardLoads;
