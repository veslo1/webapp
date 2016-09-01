'use strict';

function BpValidPassword(scope, element, attrs, ngModel) {
  "ngInject";

  // (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)

  var upperRegex = /[A-Z]+/;
  var lowerRegex = /[a-z]+/;
  var specialRegex = /[!@#$%^&*]+/;
  var numRegex = /\d+/;

  ngModel.$validators.passwordLength = function(modelValue, viewValue) {
    return viewValue && viewValue.length >= 8;
  };

  ngModel.$validators.passwordContainsUpper = function(modelValue, viewValue) {
    return upperRegex.test(viewValue);
  };

  ngModel.$validators.passwordContainsLower = function(modelValue, viewValue) {
    return lowerRegex.test(viewValue);
  };

  ngModel.$validators.passwordContainsSpecialChars = function(modelValue, viewValue) {
    return specialRegex.test(viewValue);
  };

  ngModel.$validators.passwordContainsNumber = function(modelValue, viewValue) {
    return numRegex.test(viewValue);
  };
}

export default function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: BpValidPassword
  };
};
