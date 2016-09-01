'use strict';

export default function() {
  return {
    restrict: 'E',
    template: '<div class="small-9 columns right-column" ng-transclude></div>',
    transclude: true,
    compile: function(tElement, tAttrs) {
      if (tAttrs.classes !== undefined) {
        tElement.find('div').addClass(tAttrs.classes);
      }

      if (tAttrs.inputColumn !== undefined) {
        tElement.find('div').addClass('medium-4 end');
      }
    }
  };
};
