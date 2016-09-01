'use strict';

class ProjectLaborTab {
  constructor(Projects) {
    "ngInject";

    this.commitments = [];
    this.payouts = [];
    this.overview = {};

    this.commitFormEnabled = false;
    this.requestPayoutFormEnabled = false;

    this.Projects = Projects;
  }

  $onInit() {
    this.getOverview();
    this.getPayouts();
    this.getCommitments();
  }

  getOverview() {
    this.Projects.getLaborFundsOverview(this.project.id).then((response) => {
      this.overview = response.data.data;
    });
  }

  getPayouts() {
    this.Projects.getPayouts(this.project.id).then((payouts) => {
      this.payouts = payouts;
    });
  }

  getCommitments() {
    this.Projects.getLaborCommitments(this.project.id).then((funds) => {
      this.commitments = funds;
    });
  }

  commitFundsButtonClicked() {
    this.commitFormEnabled = true;
  }

  requestPayoutButtonClicked() {
    this.requestPayoutFormEnabled = true;
  }

  commitFormClosed = () => {
    this.commitFormEnabled = false;
    this.getOverview();
    this.getCommitments();
  }

  requestPayoutFormClosed = () => {
    this.requestPayoutFormEnabled = false;
    this.getOverview();
    this.getPayouts();
  }
}

export default {
  bindings: {
    'project': '='
  },
  controller: ProjectLaborTab,
  templateUrl: 'es6/components/project-labor-tab/project-labor-tab.html'
};
