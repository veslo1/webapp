'use strict';

export default function(Messages) {
  "ngInject";

  return {
    restrict: 'E',
    template: '<button ng-show="member.canRequestCard()" ng-disabled="{{!member.validForCard()}}" class="button tiny uppercase request-card-button" ng-click="requestCard()" ng-if="!member.cardRequested()">Request Card</button>',
    scope: {
      member: '='
    },
    link: function (scope) {
      scope.requestCard = function() {
        scope.member.requestCard().then(function() {
          Messages.addSuccess('Card requested.');
          scope.member.get();
        });
      };
    }
  };
};
