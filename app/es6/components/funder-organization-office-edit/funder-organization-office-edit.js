'use strict';

class FunderOrganizationOfficeEdit {
  constructor(FunderOrganizationOffices, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.showPrimaryContact = true;

    this.updatedFunderOffice = {};
  }

  $onInit() {
    angular.copy(this.funderOffice, this.updatedFunderOffice);
  }

  updateOffice(funderOrganizationOffice, form) {
    this.FunderOrganizationOffices.updateOffice(funderOrganizationOffice.id, funderOrganizationOffice).then(() => {
      this.Messages.addSuccess('Funder office updated.');
      angular.copy(this.updatedFunderOffice, this.funderOffice);
      this.$state.go('funderOrg.offices.office.overview', {}, {reload: true});
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  templateUrl: 'es6/components/funder-organization-office-edit/funder-organization-office-edit.html',
  controller: FunderOrganizationOfficeEdit
};
