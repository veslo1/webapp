'use strict';

export default {
  require: {
    form: '^form'
  },
  bindings: {
    model: '=',
    fieldModel: '=',
    label: '@',
    name: '@',
    required: '<'
  },
  template: `
    <div class="row" bp-field-class="$ctrl.fieldModel">
      <bp-left-column inline>{{ $ctrl.label }}{{ $ctrl.required ? ' *' : '' }}</bp-left-column>
      <bp-right-column input-column>
        <textarea name="{{ $ctrl.name }}" ng-model="$ctrl.model" placeholder="{{ $ctrl.label }}" rows="6"></textarea>
        <field-errors input-field="$ctrl.fieldModel"></field-errors>
      </bp-right-column>
    </div>
  `
};
