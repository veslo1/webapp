'use strict';

export default function() {
  return {
    restrict: 'E',
    template: `
      <input type="text" ng-model="model" name="{{ name }}" bp-field-class="fieldModel" placeholder="{{ placeholder }}" bp-server-error ui-mask="99-9999999" ui-mask-placeholder ui-mask-placeholder-char="_" ui-options="{clearOnBlur: false}">
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

      if (tAttrs.required !== undefined) {
        inputEl.attr('required', true);
      }
    }
  };
};
