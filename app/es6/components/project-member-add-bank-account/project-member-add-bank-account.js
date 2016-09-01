class ProjectMemberAddBankAccount {
  constructor($state, BankAccounts, ProjectMembers, Messages) {
    "ngInject";

    this.$state = $state;
    this.BankAccounts = BankAccounts;
    this.ProjectMembers = ProjectMembers;
    this.Messages = Messages;

    this.accounts = [];
    BankAccounts.query().then((accounts) => {
      this.accounts = accounts;
    });
  }

  updateBankAccount = (accountId) => {
    this.ProjectMembers.updateBankAccount(this.member.project_id, this.member.id, accountId).then(() => {
      this.member.get();
      this.Messages.addSuccess('Project member bank account changed.');
      this.$state.go('project.members.member.view', { id: this.member.project_id, memberId: this.member.id });
    });
  };
}

export default {
  bindings: {
    member: '='
  },
  controller: ProjectMemberAddBankAccount,
  template: '<change-bank-account-list accounts="$ctrl.accounts" button-action="$ctrl.updateBankAccount"></change-bank-account-list>'
};
