'use strict';

export class ProjectMembers {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.configuration = configuration;
  }

  memberUrl(projectId, memberId) {
    return this.configuration.apiServer + '/projects/' + projectId + '/members/' + memberId;
  }

  getProjectMembers(projectId) {
    var url = this.configuration.apiServer + '/projects/' + projectId + '/members';
    return this.$http.get(url);
  }

  getMember(projectId, memberId) {
    return this.$http.get(this.memberUrl(projectId, memberId));
  }

  updateMemberRoleDescription(projectId, memberId, roleDescription) {
    var url = this.memberUrl(projectId, memberId) + '/role_description';
    return this.$http.put(url, { role_description: roleDescription });
  }

  requestCard(projectId, memberId) {
    var url = this.memberUrl(projectId, memberId) + '/card_requests';
    return this.$http.put(url);
  }

  updateCardNumber(projectId, memberId, cardNumber) {
    var url = this.memberUrl(projectId, memberId) + '/card_numbers';
    return this.$http.put(url, { card_number: cardNumber });
  }

  updateBankAccount(projectId, memberId, accountId) {
    var url = this.memberUrl(projectId, memberId) + '/bank_account';
    return this.$http.put(url, { data: { account_id: accountId } });
  }
}
