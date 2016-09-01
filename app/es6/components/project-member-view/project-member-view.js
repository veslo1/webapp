'use strict';

class ProjectMemberView {
  constructor(Messages) {
    "ngInject";

    this.Messages = Messages;

    this.canUpdateRoleDescription = this.member.canUpdateRoleDescription;
    this.canViewCardInfo = this.member.canViewCardInfo;
    this.canViewBankAccountStatus = this.member.canViewBankAccountStatus;
    this.canUpdateBankAccount = this.member.canUpdateBankAccount;
  }

  updateRoleDescription() {
    this.member.updateRoleDescription().then(() => {
      this.Messages.addSuccess('Member role description updated.');
    });
  };

  bankAccountNameText() {
    var accountName = this.member.bank_account_status;
    if (this.canUpdateBankAccount() && this.member.bank_account_name) {
      accountName = this.member.bank_account_name;
    }
    return accountName;
  };
}

export default {
  bindings: {
    member: '='
  },
  controller: ProjectMemberView,
  templateUrl: 'es6/components/project-member-view/project-member-view.html'
};
