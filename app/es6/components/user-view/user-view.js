'use strict';

class UserView {
  constructor(Messages, Users, FormErrors) {
    "ngInject";

    this.Messages = Messages;
    this.Users = Users;
    this.FormErrors = FormErrors;
  }

  canResendInvite() {
    return this.user.permissions.can_resend_invite === true;
  }

  canChangeSystemRole() {
    return this.user.permissions.can_change_system_role === true;
  }

  resendInvite() {
    this.Users.resendInvite(this.user.id).then(() => {
      this.Messages.addSuccess('Invite resent.');
    });
  }

  applyRole() {
    this.Users.updateRole(this.user.id, this.user.system_role).then(() => {
      this.Messages.addSuccess('User role changed.');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  }
}

export default {
  bindings: {
    user: '='
  },
  controller: UserView,
  templateUrl: 'es6/components/user-view/user-view.html'
};
