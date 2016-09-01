'use strict';

class BpTwoColumnRow {
  constructor() {
  }
}

export default {
  bindings: {
    bpFieldClass: '=',
    label: '@'
  },
  transclude: {
    'leftContent': '?leftContent',
    'rightContent': 'rightContent'
  },
  controller: BpTwoColumnRow,
  template: `
    <div class="row" bp-field-class="$ctrl.bpFieldClass">
      <bp-left-column inline>
        <ng-transclude ng-transclude-slot="leftContent">
          {{ $ctrl.label }}
        </ng-transclude>
      </bp-left-column>
      <bp-right-column input-column>
        <ng-transclude ng-transclude-slot="rightContent"></ng-transclude>
      </bp-right-column>
    </div>
  `
};
