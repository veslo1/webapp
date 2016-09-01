'use strict';

import FunderOrganization from '../models/funder_organization';

export default class Funders {
  constructor(ApiRequest, configuration) {
    "ngInject";

    this.ApiRequest = ApiRequest;
    this.baseUrl = configuration.apiServer;
  }

  query() {
    return this.ApiRequest.query('funder_organizations', 'data', FunderOrganization);
  }

  get(funderOrganizationId) {
    return this.ApiRequest.get(`funder_organizations/${funderOrganizationId}`, 'data', FunderOrganization);
  }

  createFunder(funder) {
    return this.ApiRequest.post('funder_organizations', { data: funder });
  }

  updateFunderOrganization(id, funderOrganization) {
    return this.ApiRequest.put(`funder_organizations/${id}`, { data: funderOrganization });
  }
}
