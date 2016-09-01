import Invite from '../../models/invite';

class ProjectAddServiceProvider {
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

  addServiceProvider = () => {
    this.Projects.addServiceProvider(this.project.id, this.invite).then((response) => {
      this.Messages.addSuccess('Service provider added.');
      this.$state.go('project.members.member.view', { id: this.project.id, memberId: response.data.data.id });
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  };
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectAddServiceProvider,
  templateUrl: 'es6/components/project-add-service-provider/project-add-service-provider.html'
};
