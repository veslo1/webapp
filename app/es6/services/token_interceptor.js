'use strict';

class TokenInterceptor {
  constructor($q, $injector, currentUser) {
    "ngInject";

    this.$q = $q;
    this.$injector = $injector;
    this.currentUser = currentUser;
  }

  request = (config) => {
    var token = this.currentUser.authToken;

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  };

  responseError = (response) => {
    if (response.status === 401) {
      this.currentUser.logout();
      this.$injector.get('$state').go('login');
    }

    return this.$q.reject(response);
  };
}

export default TokenInterceptor;
