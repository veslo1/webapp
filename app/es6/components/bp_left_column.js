'use strict';

export default function() {
  return {
    restrict: 'E',
    template: `
      <div class="small-3 columns left-column">
        <label class="right" ng-transclude></label>
      </div>
    `,
    transclude: true,
    compile: function(tElement, tAttrs) {
      if (tAttrs.inline !== undefined) {
        tElement.find('label').addClass('inline');
      }
    }
  };
}
