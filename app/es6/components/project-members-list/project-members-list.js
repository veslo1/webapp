'use strict';

class ProjectMembersList {
  constructor(ProjectMembers) {
    "ngInject";

    this.ProjectMembers = ProjectMembers;

    this.funder = {};
    this.owner = {};
    this.service_providers = [];

    ProjectMembers.getProjectMembers(this.project.id).then((response) => {
      var members = response.data.members;
      this.funder = members.funder;
      this.owner = members.owner;
      this.service_providers = members.service_providers;
    });
  }

  canChangeFunder() {
    return this.project.permissions.canChangeFunder();
  }

  canChangeOwner() {
    return this.project.permissions.canChangeOwner();
  }

  canAddServiceProviders() {
    return this.project.permissions.canAddServiceProviders();
  }
}

export default {
  bindings: {
    project: '='
  },
  controller: ProjectMembersList,
  templateUrl: 'es6/components/project-members-list/project-members-list.html'
};
