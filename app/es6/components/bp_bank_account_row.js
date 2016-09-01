'use strict';

export default {
  bindings: {
    account: '='
  },
  transclude: true,
  template: `
    <div class="row bank-account">
      <div class="small-9 columns account-name">
        {{ $ctrl.account.account_info.account_name }}
      </div>
      <div class="small-3 columns account-options" ng-transclude>
        &nbsp;
      </div>
    </div>
  `
};
