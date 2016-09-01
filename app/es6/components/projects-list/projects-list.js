'use strict';

class ProjectsList {
  constructor(Projects, currentUser) {
    "ngInject";

    this.Projects = Projects;
    this.currentUser = currentUser;
    this.projects = [];

    this.projectFunderOfficeNames = [];
    this.groupedProjects = {};
  }

  $onInit() {
    this.Projects.query().then((response) => {
      this.projects = response.data.projects;
      this.groupProjectsByFunderOffice();
    });
  }

  canCreateProject() {
    return this.currentUser.permissions.canCreateProjects();
  }

  groupProjectsByFunderOffice() {
    this.projectFunderOfficeNames = [];
    this.groupedProjects = {};

    this.projects.forEach((project) => {
      let funderOfficeName = `${project.funder_organization_name} - ${project.funder_organization_office_name}`;
      let officeIsNew = this.projectFunderOfficeNames.indexOf(funderOfficeName);
      if (officeIsNew < 0) {
        this.projectFunderOfficeNames.push(funderOfficeName);
        this.groupedProjects[funderOfficeName] = [];
      }
      this.groupedProjects[funderOfficeName].push(project);
    });
  }

  projectsForFunderOffice(funderOfficeName) {
    return this.groupedProjects[funderOfficeName];
  }
}

export default {
  controller: ProjectsList,
  templateUrl: 'es6/components/projects-list/projects-list.html'
};
