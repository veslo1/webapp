'use strict';

class UsersList {
  constructor(Users) {
    "ngInject";

    this.users = [];

    Users.query().then((users) => {
      this.users = users;
    });
  }
}

export default {
  controller: UsersList,
  templateUrl: 'es6/components/users-list/users-list.html'
};
