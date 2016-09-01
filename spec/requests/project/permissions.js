'use strict';

var _ = require('lodash');

module.exports = function(projectId, permissions) {
  var defaultPermissions = {
    can_start_project: false,
    can_change_project_owner: false,
    can_change_project_funder: false,
    can_change_project_bank_account: false,
    can_apply_project_funds: false,
    can_view_project_applied_funds: false,
    can_commit_project_funds: false,
    can_view_project_notifications: false,
    can_view_project_card_transactions: false
  };

  if (permissions) {
    defaultPermissions = _.extend(defaultPermissions, permissions);
  }

  return {
    method: 'GET',
    url: 'http://localhost:3000/projects/' + projectId + '/permissions',
    response: { permissions: defaultPermissions }
  }
};
