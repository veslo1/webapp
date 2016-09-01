class ProjectAddFunder {
  constructor($state, Projects, Messages) {
    "ngInject";

    this.$state = $state;
    this.Projects = Projects;
    this.Messages = Messages;

    this.potentialFunders = [];

    Projects.getPotentialFunders(this.project.id).then((response) => {
      this.potentialFunders = response.data.users;
    });
  }

  addFunder = (userId) => {
    this.Projects.updateFunder(this.project.id, userId).then(() => {
      this.Messages.addSuccess('Project funder changed.');
      this.$state.go('project.members.index', { id: this.project.id });
    });
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectAddFunder,
  templateUrl: 'es6/components/project-add-funder/project-add-funder.html'
};
