'use strict';

class Authentication {
  constructor(localStorageService) {
    "ngInject";

    this.localStorageService = localStorageService;
  }

  currentUser() {
    return this.localStorageService.get('currentUser');
  }

  authToken() {
    return this.localStorageService.get('authToken');
  }

  isAuthenticated() {
    return !!(this.localStorageService.get('authToken'));
  }

  permissions() {
    return this.localStorageService.get('systemPermissions');
  }

  setAuthData(data) {
    this.localStorageService.set('currentUser', data.user);
    this.localStorageService.set('systemPermissions', data.permissions);
    this.localStorageService.set('authToken', data.auth_token);
  }

  resetAuthData() {
    this.localStorageService.clearAll();
  }
}

export default Authentication;
