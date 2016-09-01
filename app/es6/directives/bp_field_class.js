'use strict';

export default function(fieldStateService) {
  "ngInject";

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      function fieldHasError() {
        var field = scope.$eval(attrs.bpFieldClass);
        return fieldStateService.hasError(field);
      }

      scope.$watch(fieldHasError, function(hasError) {
        if (hasError) {
          attrs.$addClass('error');
        } else {
          attrs.$removeClass('error');
        }
      });
    }
  };
};
