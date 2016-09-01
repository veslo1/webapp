'use strict';

class BpTwoColumnMoneyInput {
  constructor() {
  }
}

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
  controller: BpTwoColumnMoneyInput,
  template: `
    <div class="row" bp-field-class="$ctrl.fieldModel">
      <bp-left-column inline>{{ $ctrl.label }}{{ $ctrl.required ? ' *' : '' }}</bp-left-column>
      <bp-right-column input-column>
        <input type="text"
        ng-model="$ctrl.model" name="{{ $ctrl.name }}"
        placeholder="{{ $ctrl.label }}"
        ui-money-mask ui-options="{clearOnBlur: false}"
        bp-server-error ng-required="$ctrl.required">
        <field-errors input-field="$ctrl.fieldModel"></field-errors>
      </bp-right-column>
    </div>
  `
};
