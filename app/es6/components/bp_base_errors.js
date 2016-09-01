'use strict';

export default function() {
  return {
    template: `
      <div ng-if="formModel.base_errors.length" data-alert class="alert-box alert">
        <div ng-repeat="error in formModel.base_errors" >{{ error }}</div>
      </div>
    `,
    restrict: 'E',
    scope: {
      formModel: '='
    }
  };
};
