'use strict';

export default function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<h4 class="details-header" ng-transclude></h4><hr/>'
  };
};
