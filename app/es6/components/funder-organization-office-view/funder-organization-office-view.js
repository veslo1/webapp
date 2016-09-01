'use strict';

class FunderOrganizationOfficeView {
  constructor(FunderOrganizationOffices, $state) {
    "ngInject";

    this.officeMembers = [];
    this.bankAccounts = [];
    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.$state = $state;
  }

  $onInit() {
    this.FunderOrganizationOffices.getMembers(this.funderOffice.id).then((response) => {
      this.officeMembers = response.data.data;
    });

    this.FunderOrganizationOffices.getAchAccount(this.funderOffice.id).then((achAccount) => {
      this.officeAchAccount = achAccount;
    });

    this.FunderOrganizationOffices.getBankAccounts(this.funderOffice.id).then((accounts) => {
      this.bankAccounts = accounts;
    });
  }

  verifyAccount(bankAccountId) {
    this.$state.go('funderOrg.offices.office.bankAccounts.verify', { bankAccountId: bankAccountId });
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  templateUrl: 'es6/components/funder-organization-office-view/funder-organization-office-view.html',
  controller: FunderOrganizationOfficeView
};
