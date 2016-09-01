'use strict';

export default function() {
  return {
    restrict: 'E',
    template: `
      <input type="text" ng-model="model" name="{{ name }}" bp-field-class="fieldModel" placeholder="{{ placeholder }}" bp-server-error>
      <field-errors input-field="fieldModel"></field-errors>
    `,
    scope: {
      model: '=',
      fieldModel: '=',
      name: '@',
      placeholder: '@',
      required: '='
    },
    compile: function(tElement, tAttrs) {
      var inputEl = tElement.find('input');

      if (tAttrs.moneyInput !== undefined) {
        inputEl.attr('ui-money-mask', '');
      }

      if (tAttrs.required !== undefined) {
        inputEl.attr('required', true);
      }
    }
  };
};
