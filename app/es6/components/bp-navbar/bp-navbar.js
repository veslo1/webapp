'use strict';

class BpNavBar {
  constructor($state, Sessions, currentUser) {
    "ngInject";

    this.$state = $state;
    this.Sessions = Sessions;
    this.currentUser = currentUser;
  }

  canViewFunderOrganizations() {
    return this.currentUser.permissions.canManageFunders();
  }

  canViewTransactions() {
    return this.currentUser.permissions.canViewTransactions();
  }

  canViewDirectory() {
    return this.currentUser.permissions.canViewDirectory();
  }

  canViewMyBankAccounts() {
    return this.currentUser.permissions.canViewMyBankAccounts();
  }

  isActive(viewLocation) {
    if (viewLocation === '/') {
      return this.$state.current.url === viewLocation;
    } else {
      return this.$state.current.name.indexOf(viewLocation) === 0;
    }
  }

  destroySession() {
    this.Sessions.destroy().finally(() => {
      this.currentUser.logout();
      this.$state.go('login');
    });
  }
}

export default {
  templateUrl: 'es6/components/bp-navbar/bp-navbar.html',
  controller: BpNavBar
};
