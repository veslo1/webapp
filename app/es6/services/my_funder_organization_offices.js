'use strict';

import FunderOrganizationOffice from '../models/funder_organization_office';

export default class MyFunderOrganizationOffices {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  getOffices() {
    return this.ApiRequest.query(`my_funder_organization_offices`, 'data', FunderOrganizationOffice);
  }
}
