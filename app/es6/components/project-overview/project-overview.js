'use strict';

class ProjectOverview {
  constructor(Projects, Messages) {
    "ngInject";

    this.Messages = Messages;
    this.Projects = Projects;
  }

  startProject() {
    this.Projects.startProject(this.project.id).then(() => {
      this.project.get();
      this.Messages.addSuccess('Project started.');
    });
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectOverview,
  templateUrl: 'es6/components/project-overview/project-overview.html'
};
