'use strict';

export default function($q, Invites) {
  "ngInject";

  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.unique = function (modelValue, viewValue) {
        var deferred = $q.defer(),
          currentValue = modelValue || viewValue,
          key = attrs.bpUserCheckUniqueKey,
          property = attrs.bpUserCheckUniqueProperty;

        // ensure that we have key and propertyName before making server call
        if (key && property) {
          if (key === 'none') {
            key = '';
          }
          Invites.checkUnique(key, property, currentValue)
          .then(function (response) {
            if (response.data.unique) {
              deferred.resolve(); //It's unique
            } else {
              deferred.reject(); //Add unique to $errors
            }
          });
        } else {
          deferred.resolve(); //Ensure promise is resolved if we hit this
        }

        return deferred.promise;
      };
    }
  };
};
