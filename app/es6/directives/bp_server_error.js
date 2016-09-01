'use strict';
export default function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      var setupValidityWatch = function(model) {
        scope.$watch(model, function() {
          if (ngModel.$error.hasOwnProperty('serverError')) {
            ngModel.$setValidity('serverError', true);
          }
        });
      };

      if (attrs.ngModel) {
        if (attrs.bpServerErrorDependentModels) {
          angular.forEach(attrs.bpServerErrorDependentModels.split(','), setupValidityWatch);
        }

        setupValidityWatch(attrs.ngModel);
      };
    }
  };
};
