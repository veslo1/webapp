'use strict';

class ResetPassword {
  constructor(ResetPasswords, Messages, $state, FormErrors) {
    "ngInject";

    this.ResetPasswords = ResetPasswords;
    this.Messages = Messages;
    this.$state = $state;
    this.FormErrors = FormErrors;
  }

  $onInit() {
    this.user = {
      new_password: '',
      new_password_confirmation: ''
    };
  }

  resetPassword() {
    this.ResetPasswords.resetPassword(this.$state.params.hash_id, this.user).then(() => {
      this.$state.go('login');
      this.Messages.addSuccess('Password has been reset.');
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  }
}

export default {
  controller: ResetPassword,
  templateUrl: 'es6/components/reset-password/reset-password.html'
};
