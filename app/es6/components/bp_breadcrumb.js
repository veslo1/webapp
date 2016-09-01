'use strict';

export default function() {
  return {
    restrict: 'E',
    scope: {
      link: '@',
      noSeparator: '@?'
    },
    transclude: true,
    template: '<a ui-sref="{{ link }}" ng-if="link" ng-transclude></a><span ng-if="!link" ng-transclude></span><span class="sep" ng-if="link && !noSeparator"> / </span>'
  };
};
