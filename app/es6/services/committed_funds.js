'use strict';

class CommittedFunds {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.configuration = configuration;
  }

  getPotentialReceivers(projectId) {
    var url = this.configuration.apiServer + '/projects/' + projectId + '/committed_funds/potential_receivers';
    return this.$http.get(url);
  }

  getFund(fundId) {
    var url = this.configuration.apiServer + '/committed_funds/' + fundId;
    return this.$http.get(url);
  }

  acknowledgeFund(fundId) {
    var url = this.configuration.apiServer + '/committed_funds/' + fundId + '/acknowledgements';
    return this.$http.put(url);
  }
}

export default CommittedFunds;
