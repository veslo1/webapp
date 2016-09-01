'use strict';

export default function() {
  return {
    restrict: 'E',
    template: `
      <div class="row">
        <div class="small-12 medium-9 medium-offset-3 columns" ng-transclude></div>
      </div>
    `,
    transclude: true
  };
}
