'use strict';

class FunderOrganizationOfficeBankAccountVerify {
  constructor(FunderOrganizationOffices, Messages, FormErrors, $state) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.Messages = Messages;
    this.$state = $state;
    this.FormErrors = FormErrors;
  }

  save(deposits, form, callback) {
    this.FunderOrganizationOffices.verifyBankAccount(this.funderOffice.id, this.$state.params.bankAccountId, deposits.amount1, deposits.amount2).then((response) => {
      if (callback !== undefined) { callback(); }
      this.Messages.addSuccess('Bank account verified.');
      this.$state.go('funderOrg.offices.office.overview');
    }, (errors) => {
      if (callback !== undefined) { callback(); }
      this.FormErrors.handle(form, errors);
    });
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  controller: FunderOrganizationOfficeBankAccountVerify,
  template: `
    <bp-breadcrumbs>
      <bp-breadcrumb link="funderOrg.offices.index">Offices</bp-breadcrumb>
      <bp-breadcrumb link="funderOrg.offices.office.overview">{{ $ctrl.funderOffice.name }}</bp-breadcrumb>
      <bp-breadcrumb>Verify Bank Account</bp-breadcrumb>
    </bp-breadcrumbs>
    <bank-account-verify on-save="$ctrl.save(deposits, form, callback)"></bank-account-verify>
  `
};
