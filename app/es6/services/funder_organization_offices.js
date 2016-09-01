'use strict';

import FunderOrganizationOffice from '../models/funder_organization_office';
import User from '../models/user';
import FunderOrganizationOfficeMember from '../models/funder_organization_office_member';
import AchAccount from '../models/ach_account';
import BankAccount from '../models/bank_account';

export default class FunderOrganizationOffices {
  constructor(ApiRequest) {
    "ngInject";

    this.ApiRequest = ApiRequest;
  }

  get(officeId) {
    return this.ApiRequest.get(`funder_organization_offices/${officeId}`, 'data', FunderOrganizationOffice);
  }

  getMembers(officeId) {
    return this.ApiRequest.queryRaw(`funder_organization_offices/${officeId}/members`);
  }

  createProject(officeId, project) {
    return this.ApiRequest.post(`funder_organization_offices/${officeId}/projects`, { data: project });
  }

  createOfficeMember(officeId, email, parentOfficeMemberId) {
    return this.ApiRequest.post(`funder_organization_offices/${officeId}/members`, { data: { email: email, parent_office_member_id: parentOfficeMemberId } });
  }

  getAchAccount(officeId) {
    return this.ApiRequest.get(`funder_organization_offices/${officeId}/ach_accounts`, 'data', AchAccount);
  }

  getBankAccounts(officeId) {
    return this.ApiRequest.query(`funder_organization_offices/${officeId}/bank_accounts`, 'data', BankAccount);
  }

  createBankAccount(officeId, bankAccount) {
    return this.ApiRequest.post(`funder_organization_offices/${officeId}/bank_accounts`, { data: bankAccount });
  }

  verifyBankAccount(officeId, bankAccountId, amount1, amount2) {
    return this.ApiRequest.put(`funder_organization_offices/${officeId}/bank_accounts/${bankAccountId}/verifications`, { data: { amount1: amount1, amount2: amount2 } });
  }

  createOfficeAchAccount(officeId, achAccount) {
    return this.ApiRequest.post(`funder_organization_offices/${officeId}/ach_accounts`, { data: achAccount });
  }

  createDocumentUrl(officeId) {
    return `${this.ApiRequest.baseUrl}/funder_organization_offices/${officeId}/documents`;
  }

  query(funderOrganizationId) {
    return this.ApiRequest.query(`funder_organizations/${funderOrganizationId}/offices`, 'data', FunderOrganizationOffice);
  }

  getPotentialPrimaryContacts(officeId) {
    return this.ApiRequest.query(`funder_organization_offices/${officeId}/potential_primary_contacts`, 'data', User);
  }

  getPotentialParentMembers(officeId) {
    return this.ApiRequest.query(`funder_organization_offices/${officeId}/potential_parent_members`, 'data', FunderOrganizationOfficeMember);
  }

  createOffice(funderOrganizationId, funderOrganizationOffice) {
    return this.ApiRequest.post(`funder_organizations/${funderOrganizationId}/offices`, { data: funderOrganizationOffice });
  }

  updateOffice(officeId, funderOrganizationOffice) {
    return this.ApiRequest.put(`funder_organization_offices/${officeId}`, { data: funderOrganizationOffice });
  }
}
