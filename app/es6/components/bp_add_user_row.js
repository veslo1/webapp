'use strict';

export default function () {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    transclude: true,
    template: `
      <div class="row collapse bp-table-row user">
        <div class="small-5 medium-3 large-3 columns user-full-name">
          {{ user.full_name }}
        </div>
        <div class="show-for-medium-up small-4 columns user-email">
          {{ user.email }}
        </div>
        <div class="small-2 columns user-options" ng-transclude>
        </div>
      </div>
    `
  };
};
