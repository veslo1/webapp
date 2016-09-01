'use strict';

class SessionsService {
  constructor(configuration, $http) {
    "ngInject";

    this.url = configuration.apiServer + '/sessions';
    this.$http = $http;
  }

  create(userParams) {
    return this.$http.post(this.url, userParams);
  }

  destroy() {
    return this.$http.delete(this.url);
  }
}

export default SessionsService;
