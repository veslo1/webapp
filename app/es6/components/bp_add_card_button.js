'use strict';

export default function($state) {
  "ngInject";

  return {
    restrict: 'E',
    template: '<button class="button tiny uppercase add-card-number-button" ng-click="addCard()" ng-if="member.canHaveCardNumber()" ng-show="member.validForCardNumber()">Add Card Number</button>',
    scope: {
      member: '='
    },
    link: function (scope) {
      scope.addCard = function() {
        $state.go('project.members.member.addCardNumber', { id: scope.member.project_id, memberId: scope.member.id });
      };
    }
  };
};
