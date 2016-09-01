'use strict';

class FunderOrganizationOfficeForm {
  constructor(FunderOrganizationOffices, CompanyTypes) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.potentialPrimaryContacts = [];
    this.companyTypes = CompanyTypes.items;
  }

  $onInit() {
    if (this.showPrimaryContact) {
      this.FunderOrganizationOffices.getPotentialPrimaryContacts(this.funderOrganizationOffice.id).then((users) => {
        this.potentialPrimaryContacts = users;
      });
    };
  }

  onSubmit() {
    this.onSave({ funderOrganizationOffice: this.funderOrganizationOffice, form: this.form });
  }
}

export default {
  controller: FunderOrganizationOfficeForm,
  bindings: {
    onSave: '&',
    funderOrganizationOffice: '=',
    showPrimaryContact: '<',
    buttonLabel: '@?'
  },
  templateUrl: 'es6/components/funder-organization-office-form/funder-organization-office-form.html'
};
