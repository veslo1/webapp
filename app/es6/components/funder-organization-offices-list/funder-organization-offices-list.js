'use strict';

class FunderOrganizationOfficesCtrl {
  constructor(FunderOrganizationOffices, $stateParams) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.funderOrgOffices = [];
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.FunderOrganizationOffices.query(this.$stateParams.id).then((funderOrgOffices) => {
      this.funderOrgOffices = funderOrgOffices;
    });
  }
}

export default {
  bindings: {
    'funderOrganization': '='
  },
  templateUrl: 'es6/components/funder-organization-offices-list/funder-organization-offices-list.html',
  controller: FunderOrganizationOfficesCtrl
};
