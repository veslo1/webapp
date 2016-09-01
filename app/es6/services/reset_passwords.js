class ResetPasswords {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.url = configuration.apiServer + '/password_resets';
  }

  sendPasswordResetLink(userParams) {
    return this.$http.post(this.url, userParams);
  }

  resetPassword(hashId, userParams) {
    var resetUrl = this.url + '/' + hashId;
    return this.$http.put(resetUrl, userParams);
  }
}

export default ResetPasswords;
