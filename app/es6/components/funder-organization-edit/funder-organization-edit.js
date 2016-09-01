'use strict';

class EditFunderOrganization {
  constructor(FunderOrganizations, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.FunderOrganizations = FunderOrganizations;
  }

  updateFunderOrganization() {
    this.FunderOrganizations.updateFunderOrganization(this.funderOrganization.id, this.funderOrganization).then(() => {
      this.Messages.addSuccess('Funder updated.');
      this.$state.go('funderOrg.overview.index', { id: this.funderOrganization.id });
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  };
}

export default {
  bindings: {
    'funderOrganization': '='
  },
  templateUrl: 'es6/components/funder-organization-edit/funder-organization-edit.html',
  controller: EditFunderOrganization
};
