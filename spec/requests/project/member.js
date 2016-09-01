'use strict';

module.exports = function(projectMember, permissions) {
  permissions = permissions || {
    can_view_card_info: false,
    can_request_card_for_user: false,
    can_update_role_description: false,
    can_have_card_number: false,
    can_view_bank_account_status: false,
    can_update_bank_account: false
  };

  return {
    method: 'GET',
    url: `http://localhost:3000/projects/${projectMember.project_id}/members/${projectMember.user.id}`,
    response: {
      member: projectMember,
      permissions: permissions
    }
  };
};
