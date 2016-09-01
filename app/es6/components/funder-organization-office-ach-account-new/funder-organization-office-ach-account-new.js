'use strict';

import AchAccount from './../../models/ach_account';

class FunderOrganizationOfficeAchAccountNew {
  constructor(FunderOrganizationOffices, $state, Messages, FormErrors) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
  }

  $onInit() {
    this.achAccount = new AchAccount();
  }

  createOfficeAchAccount() {
    this.FunderOrganizationOffices.createOfficeAchAccount(this.funderOffice.id, this.achAccount).then(() => {
      this.funderOffice.setCanAddBankAccount();
      this.Messages.addSuccess('Office responsible individual added.');
      this.$state.go('funderOrg.offices.office.overview');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  controller: FunderOrganizationOfficeAchAccountNew,
  templateUrl: 'es6/components/funder-organization-office-ach-account-new/funder-organization-office-ach-account-new.html'
};
