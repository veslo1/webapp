'use strict';

import CommittedFund from '../models/committed_fund';
import CardLoad from '../models/card_load';
import Payout from '../models/payout';
import BankAccount from '../models/bank_account';

class Projects {
  constructor($http, configuration, ApiRequest) {
    "ngInject";

    this.$http = $http;
    this.url = configuration.apiServer + '/projects';
    this.ApiRequest = ApiRequest;
  }

  checkUnique(key, property, value) {
    var query = {};
    query[property] = value;

    if (key) {
      query.id = key;
    }
    return this.$http.get(this.url + '/check_unique', { params: query });
  }

  updateProject(project) {
    return this.$http.put(`${this.url}/${project.id}`, { data: project });
  }

  query() {
    return this.$http.get(this.url);
  }

  getProject(projectId) {
    return this.$http.get(this.url + '/' + projectId);
  }

  startProject(projectId) {
    return this.$http.put(this.url + '/' + projectId + '/start');
  }

  getPotentialFunders(projectId) {
    return this.$http.get(this.url + '/' + projectId + '/potential_funders');
  }

  getPotentialBankAccounts(projectId) {
    return this.ApiRequest.query(`projects/${projectId}/potential_bank_accounts`, 'data', BankAccount);
  }

  updateFunder(projectId, userId) {
    return this.$http.put(this.url + '/' + projectId + '/funder', { funder: { user_id: userId } });
  }

  updateOwner(projectId, invite) {
    return this.$http.put(`${this.url}/${projectId}/owner`, { data: invite });
  }

  updateBankAccount(projectId, accountId) {
    return this.$http.put(this.url + '/' + projectId + '/bank_account', { data: { account_id: accountId } });
  }

  addServiceProvider(projectId, invite) {
    return this.$http.post(this.url + '/' + projectId + '/service_providers', { data: invite });
  }

  getProjectPermissions(projectId) {
    return this.$http.get(this.url + '/' + projectId + '/permissions');
  }

  getFinancialOverview(projectId) {
    return this.$http.get(this.url + '/' + projectId + '/financial_overview');
  }

  getMaterialCommitments(projectId) {
    return this.ApiRequest.query(`projects/${projectId}/material_commitments`, 'data', CommittedFund);
  }

  getMaterialFundsOverview(projectId) {
    return this.$http.get(`${this.url}/${projectId}/material_funds_overview`);
  }

  getLaborCommitments(projectId) {
    return this.ApiRequest.query(`projects/${projectId}/labor_commitments`, 'data', CommittedFund);
  }

  getLaborFundsOverview(projectId) {
    return this.$http.get(`${this.url}/${projectId}/labor_funds_overview`);
  }

  getCardLoads(projectId) {
    return this.ApiRequest.query(`projects/${projectId}/card_loads`, 'data', CardLoad);
  }

  getPayouts(projectId) {
    return this.ApiRequest.query(`projects/${projectId}/payouts`, 'data', Payout);
  }

  commitLaborFunds(projectId, fundAmount, userId) {
    return this.ApiRequest.post(`projects/${projectId}/labor_commitments`, { data: { fund_amount: fundAmount, user_id: userId } });
  }

  commitMaterialFunds(projectId, fundAmount, userId) {
    return this.ApiRequest.post(`projects/${projectId}/material_commitments`, { data: { fund_amount: fundAmount, user_id: userId } });
  }
}

export default Projects;
