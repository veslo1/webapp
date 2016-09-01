'use strict';

import User from '../models/user';

export class Users {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  query() {
    return this.ApiRequest.query('users', 'users', User);
  }

  getUser(userId) {
    return this.ApiRequest.get(`users/${userId}`, 'user', User);
  }

  resendInvite(userId) {
    return this.ApiRequest.post(`users/${userId}/reinvites`, {});
  }

  updateRole(userId, siteRole) {
    return this.ApiRequest.put(`users/${userId}/role`, { role: { name: siteRole } });
  }
}
