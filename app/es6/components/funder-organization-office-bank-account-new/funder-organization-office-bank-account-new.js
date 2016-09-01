'use strict';

class FunderOrganizationOfficeBankAccountNew {
  constructor(FunderOrganizationOffices, Messages, $state, FormErrors) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.Messages = Messages;
    this.$state = $state;
    this.FormErrors = FormErrors;
  }

  addBankAccount(account, form) {
    this.FunderOrganizationOffices.createBankAccount(this.funderOffice.id, account).then(() => {
      this.Messages.addSuccess('Bank account added.');
      this.$state.go('funderOrg.offices.office.overview');
    }, (errors) => {
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  controller: FunderOrganizationOfficeBankAccountNew,
  template: `
  <bp-breadcrumbs>
    <bp-breadcrumb link="funderOrg.offices.index">Offices</bp-breadcrumb>
    <bp-breadcrumb link="funderOrg.offices.office.overview">{{ $ctrl.funderOffice.name }}</bp-breadcrumb>
    <bp-breadcrumb>New Bank Account</bp-breadcrumb>
  </bp-breadcrumbs>
  <bank-account-details-new on-save="$ctrl.addBankAccount(account, form)"></bank-account-details-new>
  `
};
