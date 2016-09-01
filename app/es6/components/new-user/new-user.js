'use strict';

class NewUser {
  constructor(Invites, Registrations, currentUser, Messages, $state, FormErrors) {
    "ngInject";

    this.Registrations = Registrations;
    this.currentUser = currentUser;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.Invites = Invites;

    this.invite = {};
  }

  $onInit() {
    this.user = {
      first_name: '',
      last_name: '',
      home_mobile_phone: '',
      password: '',
      password_confirmation: '',
      tos_agreement: false
    };

    this.Invites.getInviteByHashId(this.inviteId).then((response) => {
      this.invite = response.data.invite;

      this.user.first_name = this.invite.first_name;
      this.user.last_name = this.invite.last_name;
    });
  }

  createUser() {
    this.Registrations.createUser(this.user, this.inviteId).then((response) => {
      this.currentUser.login(response.data);
      this.Messages.addSuccess('Signed Up!');
      this.$state.go('projects');
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  };
}

export default {
  bindings: {
    inviteId: '<'
  },
  controller: NewUser,
  templateUrl: 'es6/components/new-user/new-user.html'
};
