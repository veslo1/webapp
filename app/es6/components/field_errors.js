'use strict';

export default function(fieldStateService) {
  "ngInject";

  return {
    template: `
      <small class="error field-errors-{{ inputField.$name }}" ng-messages="inputField.$error" ng-if="fieldHasError()">
        <span ng-message="serverError">{{ serverErrorMessage() }}</span>
        <span ng-message="required">This field is required!</span>
        <span ng-message="minlength">This field is too short!</span>
        <span ng-message="maxlength">This field is too long!</span>
        <span ng-message="email">Email is not valid!</span>
        <span ng-message="invalid">This field is not valid!</span>
        <span ng-message="passwordsMustMatch">Passwords do not match.</span>
        <span ng-message="fieldsMustMatch">Fields do not match.</span>
        <span ng-message="unique">This field value has already been taken!</span>
        <span ng-message="pattern">This field is not valid!</span>
        <span ng-message="min">Value less than allowed!</span>
        <span ng-message="max">Exceeds amount available!</span>
        <span ng-message="mask">This field is not valid!</span>
        <span ng-message="parse">This field is not valid!</span>
        <span ng-message="passwordLength">must be at least 8 characters.</span>
        <span ng-message="passwordContainsUpper">must include at least 1 uppercase letter</span>
        <span ng-message="passwordContainsLower">must include at least 1 lowercase letter</span>
        <span ng-message="passwordContainsSpecialChars">must include at least 1 special character (ex '%')</span>
        <span ng-message="passwordContainsNumber">must include at least 1 number</span>
      </small>
    `,
    restrict: 'E',
    require: '^form',
    scope: {
      inputField: '='
    },
    link: function(scope, element, attrs, ctrl) {
      scope.fieldHasError = function() {
        return fieldStateService.hasError(scope.inputField);
      };

      scope.serverErrorMessage = function() {
        if (ctrl.serverErrors[scope.inputField.$name]) {
          return ctrl.serverErrors[scope.inputField.$name].join(". ");
        } else {
          return "Request Failed Due to Server Error!";
        }
      };
    }
  };
}
