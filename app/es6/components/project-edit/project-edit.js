'use strict';

class ProjectEdit {
  constructor(Projects, $state, Messages, FormErrors, States) {
    "ngInject";

    this.Projects = Projects;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.stateOptions = States.all;
    this.project = {};
  }

  $onInit() {
    angular.copy(this.inputProject, this.project);
  }

  updateProject() {
    this.Projects.updateProject(this.project).then(() => {
      this.Messages.addSuccess('Project updated.');
      this.inputProject.get();
      this.$state.go('project.overview.index');
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  }
}

export default {
  bindings: {
    inputProject: '='
  },
  controller: ProjectEdit,
  templateUrl: 'es6/components/project-edit/project-edit.html'
};
