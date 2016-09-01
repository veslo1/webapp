'use strict';

export default {
  bindings: {
    accounts: '=',
    buttonAction: '='
  },
  template: `
    <div class="tab-section bank-accounts clearfix">
    <div class="row tab-section-header-row">
    <div class="small-8 columns">
    <h4>Change Bank Account</h4>
    </div></div>
    <div class="row collapse gray-table">
    <bp-bank-account-header-row></bp-bank-account-header-row>

    <bp-bank-account-row account="accountRecord" ng-repeat="accountRecord in $ctrl.accounts">
    <button class="button uppercase inline tiny add-account-button" ng-click="$ctrl.buttonAction(accountRecord.id)">Use Account</button>
    </bp-bank-account-row>

    <bp-no-entries-row ng-show="!$ctrl.accounts.length">No Bank Accounts</bp-no-entries-row>
    </div>
    </div>`
};
