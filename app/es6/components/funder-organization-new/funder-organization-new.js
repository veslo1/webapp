'use strict';

import FunderOrganization from '../../models/funder_organization';

class FunderOrganizationNew {
  constructor(FunderOrganizations, $state, Messages, FormErrors) {
    "ngInject";

    this.FunderOrganizations = FunderOrganizations;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.funderOrg = new FunderOrganization();
  }

  createFunderOrganization() {
    this.FunderOrganizations.createFunder(this.funderOrg).then(() => {
      this.Messages.addSuccess('Funder created.');
      this.$state.go('funder_organizations');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  }
}

export default {
  controller: FunderOrganizationNew,
  templateUrl: 'es6/components/funder-organization-new/funder-organization-new.html'
};
