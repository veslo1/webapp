'use strict';

class NewInvite {
  constructor(Invites, $state, Messages, FormErrors) {
    "ngInject";

    this.Invites = Invites;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.invite = {
      first_name: '',
      last_name: '',
      email: ''
    };
  }

  createInvite() {
    this.Invites.createInvite(this.invite).then(() => {
      this.Messages.addSuccess('Invite sent.');
      this.$state.go('directory.users');
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  };
}

export default {
  controller: NewInvite,
  templateUrl: 'es6/components/new-invite/new-invite.html'
};
