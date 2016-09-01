'use strict';

class FunderOrganizationsCtrl {
  constructor(FunderOrganizations) {
    "ngInject";

    this.FunderOrganizations = FunderOrganizations;
    this.funderOrgs = [];
  }

  $onInit() {
    this.FunderOrganizations.query().then((funderOrgs) => {
      this.funderOrgs = funderOrgs;
    });
  }
}

export default {
  templateUrl: 'es6/components/funder-organizations-list/funder-organizations-list.html',
  controller: FunderOrganizationsCtrl
};
