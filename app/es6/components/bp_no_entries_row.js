'use strict';

export default function () {
  return {
    restrict: 'E',
    transclude: true,
    template: `
      <div class="row bp-table-row collapse no-entries">
        <div class="small-12 columns" ng-transclude>
        </div>
      </div>
    `
  };
};
