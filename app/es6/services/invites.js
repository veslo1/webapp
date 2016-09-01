'use strict';

export class Invites {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.url = configuration.apiServer + '/invites';
  }

  createInvite(params) {
    return this.$http.post(this.url, { invite: params });
  }

  getInviteByHashId(inviteHashId) {
    return this.$http.get(this.url + '/' + inviteHashId);
  }

  checkUnique(key, property, value) {
    var query = {};
    query[property] = value;

    if (key) {
      query.id = key;
    }
    return this.$http.get(this.url + '/check_unique', { params: query });
  }
}
