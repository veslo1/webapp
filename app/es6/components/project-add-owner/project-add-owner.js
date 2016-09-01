import Invite from '../../models/invite';

class ProjectAddOwner {
  constructor($state, Projects, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Projects = Projects;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
  }

  $onInit() {
    this.invite = new Invite();
  }

  addOwner() {
    this.Projects.updateOwner(this.project.id, this.invite).then(() => {
      this.project.get();
      this.Messages.addSuccess('Project owner changed.');
      this.$state.go('project.members.index', { id: this.project.id });
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  };

  cancelForm() {
    this.$state.go('project.members.index');
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectAddOwner,
  templateUrl: 'es6/components/project-add-owner/project-add-owner.html'
};
