'use strict';

class ProjectNew {
  constructor(FunderOrganizationOffices, MyFunderOrganizationOffices, $state, Messages, FormErrors, States) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.MyFunderOrganizationOffices = MyFunderOrganizationOffices;

    this.stateOptions = States.all;

    this.project = {
      name: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postal_code: '',
      claim_number: '',
      description: '',
      comments: '',
      material_funds: '',
      labor_funds: '',
      overhead_funds: '',
      profit_funds: ''
    };
    this.offices = [];
    this.funderOfficeId = '';
  }

  $onInit() {
    this.MyFunderOrganizationOffices.getOffices().then((offices) => {
      this.offices = offices;
      this.officesWithProjectCreatePermission = this.officesWithProjectCreatePermission();
      if (this.officesWithProjectCreatePermission.length === 1) {
        this.funderOfficeId = '' + this.officesWithProjectCreatePermission[0].id;
      }
    });
  }

  officesWithProjectCreatePermission() {
    return this.offices.filter((office) => {
      return office.permissions['can_create_projects'] === true;
    });
  }

  createProject() {
    this.FunderOrganizationOffices.createProject(this.funderOfficeId, this.project).then(() => {
      this.Messages.addSuccess('Project saved.');
      this.$state.go('projects');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  }
}

export default {
  controller: ProjectNew,
  templateUrl: 'es6/components/project-new/project-new.html'
};
