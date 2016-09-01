'use strict';

import FunderOrganizationOfficeMember from '../models/funder_organization_office_member';

export default class FunderOrganizationOfficeMembers {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  getMember(memberId) {
    return this.ApiRequest.get(`funder_organization_office_members/${memberId}`, 'data', FunderOrganizationOfficeMember);
  }

  updateMember(memberId, data) {
    return this.ApiRequest.put(`funder_organization_office_members/${memberId}`, { data: data });
  }

  getPotentialParentMembers(memberId) {
    return this.ApiRequest.query(`funder_organization_office_members/${memberId}/potential_parent_members`, 'data', FunderOrganizationOfficeMember);
  }
}
