'use strict';

class StateDropdown {
  constructor(States) {
    "ngInject";

    this.stateOptions = States.all;
  }
}

export default {
  controller: StateDropdown,
  bindings: {
    model: '=',
    fieldModel: '=',
    name: '@',
    required: '@?'
  },
  template: `
    <select class="state-dropdown" name="{{ $ctrl.name }}" ng-model="$ctrl.model" bp-field-class="$ctrl.fieldModel" ng-required="$ctrl.required">
      <option value="">State</option>
      <option ng-repeat="stateOption in $ctrl.stateOptions" value="{{ stateOption }}">{{ stateOption }}</option>
    </select>
    <field-errors input-field="$ctrl.fieldModel"></field-errors>
  `
};
