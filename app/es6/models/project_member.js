'use strict';

export default function(ProjectMembers, $filter) {
  "ngInject";

  var ProjectMember = function(data) {
    var self = this;

    self.permissions = {};
    self.prevalidation_errors = {};

    self.setProperties(data);

    self.get = function() {
      ProjectMembers.getMember(self.project_id, self.id).then(function(response) {
        self.setProperties(response.data.member);
        self.permissions = response.data.permissions;
      });
    };

    self.canUpdateRoleDescription = function() {
      return self.permissions.can_update_role_description === true;
    };

    self.canViewBankAccountStatus = function() {
      return self.permissions.can_view_bank_account_status === true;
    };

    self.canUpdateBankAccount = function() {
      return self.permissions.can_update_bank_account === true;
    };

    self.updateCardNumber = function(cardNumber) {
      return ProjectMembers.updateCardNumber(self.project_id, self.id, cardNumber);
    };

    self.updateRoleDescription = function() {
      return ProjectMembers.updateMemberRoleDescription(self.project_id, self.id, self.role_description);
    };

    self.cardRequestedText = function() {
      if (self.card_requested === true) {
        return $filter('date')(self.card_requested_at, 'medium');
      } else {
        if (self.validForCard()) {
          return 'No';
        } else {
          return self.prevalidation_errors.can_have_card.join('. ');
        }
      }
    };

    self.cardIssuedText = function() {
      if (self.card_issued === true) {
        return $filter('date')(self.card_issued_at, 'medium');
      } else {
        return 'No';
      }
    };

    self.canHaveCardNumber = function() {
      return self.permissions.can_have_card_number === true;
    };

    self.hasCard = function() {
      return self.card_issued === true;
    };

    self.cardRequested = function() {
      return self.card_requested === true;
    };

    self.canViewCardInfo = function() {
      return self.permissions.can_view_card_info === true;
    };

    self.canRequestCard = function() {
      return self.permissions.can_request_card_for_user === true;
    };

    self.validForCard = function() {
      return self.can_have_card === true;
    };

    self.validForCardNumber = function() {
      return self.can_have_card_number === true;
    };

    self.validForCardErrors = function() {
      if (self.prevalidation_errors.can_have_card.length > 0) {
        return self.prevalidation_errors.can_have_card.join(', ');
      } else {
        return '';
      }
    };

    self.requestCard = function() {
      return ProjectMembers.requestCard(self.project_id, self.id);
    };
  };

  ProjectMember.prototype.setProperties = function(data) {
    for (var attr in data) {
      if (data.hasOwnProperty(attr)) {
        this[attr] = data[attr];
      }
    }
  };

  return ProjectMember;
}
