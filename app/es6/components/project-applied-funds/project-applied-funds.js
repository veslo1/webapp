'use strict';

class ProjectAppliedFundsView {
  constructor(ProjectAppliedFunds, Messages, FormErrors) {
    "ngInject";

    this.ProjectAppliedFunds = ProjectAppliedFunds;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.funds = [];

    ProjectAppliedFunds.getFunds(this.project.id).then((response) => {
      this.funds = response.data.funds;
    });
  }

  canViewProjectAppliedFunds() {
    return this.project.permissions.canViewProjectAppliedFunds();
  }

  canApplyProjectFunds() {
    return this.project.permissions.canApplyProjectFunds() && !this.project.hasStarted();
  }

  updateProjectFunds() {
    this.ProjectAppliedFunds.updateFunds(this.project.id, this.funds).then(() => {
      this.Messages.addSuccess('Project applied funds updated.');
      this.project.get();
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  }

  showViewSection() {
    return this.canViewProjectAppliedFunds() && !this.canApplyProjectFunds();
  }

  showApplySection() {
    return this.canApplyProjectFunds();
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectAppliedFundsView,
  templateUrl: 'es6/components/project-applied-funds/project-applied-funds.html'
};
