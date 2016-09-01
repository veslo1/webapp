class ProjectAddBankAccount {
  constructor($state, Projects, Messages) {
    "ngInject";

    this.$state = $state;
    this.Projects = Projects;
    this.Messages = Messages;

    this.accounts = [];
  }

  $onInit() {
    this.Projects.getPotentialBankAccounts(this.project.id).then((accounts) => {
      this.accounts = accounts;
    });
  }

  addBankAccount = (accountId) => {
    this.Projects.updateBankAccount(this.project.id, accountId).then(() => {
      this.project.get();
      this.Messages.addSuccess('Project bank account changed.');
      this.$state.go('project.overview.index', { id: this.project.id });
    });
  };
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectAddBankAccount,
  template: '<change-bank-account-list accounts="$ctrl.accounts" button-action="$ctrl.addBankAccount"></change-bank-account-list>'
};
