'use strict';

class Registrations {
  constructor($http, configuration) {
    "ngInject";

    this.url = configuration.apiServer + '/registrations';
    this.$http = $http;
  }

  createUser(userParams, inviteHashId) {
    return this.$http.post(this.url, { user: userParams, invite_hash_id: inviteHashId });
  }
};

export default Registrations;
