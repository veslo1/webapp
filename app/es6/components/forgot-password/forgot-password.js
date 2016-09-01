'use strict';

class ForgotPassword {
  constructor(ResetPasswords, Messages, $state) {
    "ngInject";

    this.ResetPasswords = ResetPasswords;
    this.Messages = Messages;
    this.$state = $state;

    this.user = {
      email: ''
    };
  }

  sendPasswordResetLink() {
    this.ResetPasswords.sendPasswordResetLink(this.user).then(() => {
      this.Messages.addSuccess('Password reset link sent.');
      this.$state.go('login');
    });
  };
}

export default {
  controller: ForgotPassword,
  templateUrl: 'es6/components/forgot-password/forgot-password.html'
};
