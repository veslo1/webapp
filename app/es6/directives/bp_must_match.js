'use strict';

function BpMustMatch(scope, element, attrs, ngModel) {
  "ngInject";

  var otherValue;

  var validatorType = 'passwordsMustMatch';

  if (element[0].type === 'text') {
    validatorType = 'fieldsMustMatch';
  }

  ngModel.$validators[validatorType] = function(modelValue) {
    return modelValue === otherValue;
  };

  scope.$watch(attrs.mustMatch, function(value) {
    otherValue = value;
    ngModel.$validate();
  });
}

export default function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: BpMustMatch
  };
};
