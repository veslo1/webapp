'use strict';

class ProjectMaterialsTab {
  constructor(Projects) {
    "ngInject";

    this.commitments = [];
    this.cardLoads = [];
    this.overview = {};

    this.commitFormEnabled = false;
    this.requestCardLoadFormEnabled = false;

    this.Projects = Projects;
  }

  $onInit() {
    this.getOverview();
    this.getCardLoads();
    this.getCommitments();
  }

  getOverview() {
    this.Projects.getMaterialFundsOverview(this.project.id).then((response) => {
      this.overview = response.data.data;
    });
  }

  getCardLoads() {
    this.Projects.getCardLoads(this.project.id).then((cardLoads) => {
      this.cardLoads = cardLoads;
    });
  }

  getCommitments() {
    this.Projects.getMaterialCommitments(this.project.id).then((funds) => {
      this.commitments = funds;
    });
  }

  commitFundsButtonClicked() {
    this.commitFormEnabled = true;
  }

  requestCardLoadButtonClicked() {
    this.requestCardLoadFormEnabled = true;
  }

  commitFormClosed = () => {
    this.commitFormEnabled = false;
    this.getOverview();
    this.getCommitments();
  }

  requestCardLoadFormClosed = () => {
    this.requestCardLoadFormEnabled = false;
    this.getOverview();
    this.getCardLoads();
  }
}

export default {
  bindings: {
    'project': '='
  },
  controller: ProjectMaterialsTab,
  templateUrl: 'es6/components/project-materials-tab/project-materials-tab.html'
};
