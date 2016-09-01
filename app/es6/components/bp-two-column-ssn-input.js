'use strict';

class BpTwoColumnSsnInput {
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
  controller: BpTwoColumnSsnInput,
  template: `
    <div class="row" bp-field-class="$ctrl.fieldModel">
      <bp-left-column inline>{{ $ctrl.label || 'Social Security Number' }}{{ $ctrl.required ? ' *' : '' }}</bp-left-column>
      <bp-right-column input-column>
        <input type="text"
        ng-model="$ctrl.model" name="{{ $ctrl.name }}"
        placeholder="SSN"
        ui-mask="999-99-9999" ui-mask-placeholder ui-mask-placeholder-char="_" ui-options="{clearOnBlur: false}"
        bp-server-error ng-required="$ctrl.required">
        <field-errors input-field="$ctrl.fieldModel"></field-errors>
      </bp-right-column>
    </div>
  `
};
