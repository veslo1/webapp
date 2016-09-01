'use strict';

export default class ProjectAppliedFunds {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.configuration = configuration;
  }

  urlFor(projectId) {
    return this.configuration.apiServer + '/projects/' + projectId + '/applied_funds';
  };

  getFunds(projectId) {
    return this.$http.get(this.urlFor(projectId));
  }

  updateFunds(projectId, funds) {
    return this.$http.put(this.urlFor(projectId), { funds: funds });
  }
}
