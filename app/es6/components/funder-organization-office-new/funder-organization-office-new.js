'use strict';

import FunderOrganizationOffice from '../../models/funder_organization_office';

class FunderOrganizationOfficeNew {
  constructor(FunderOrganizationOffices, $state, Messages, FormErrors) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.showPrimaryContact = false;
    this.funderOrganizationOffice = new FunderOrganizationOffice();
  }

  createFunderOrganizationOffice(funderOrganizationOffice, form) {
    this.FunderOrganizationOffices.createOffice(this.funderOrganization.id, funderOrganizationOffice).then(() => {
      this.Messages.addSuccess('Funder office created.');
      this.$state.go('funderOrg.offices.index', { id: this.funderOrganization.id });
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  };
}

export default {
  bindings: {
    funderOrganization: '='
  },
  controller: FunderOrganizationOfficeNew,
  templateUrl: 'es6/components/funder-organization-office-new/funder-organization-office-new.html'
};
