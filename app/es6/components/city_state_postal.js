'use strict';

export default {
  bindings: {
    address: '='
  },
  template: `<span class="city">{{ $ctrl.address.city }}</span><span ng-show="$ctrl.address.city && $ctrl.address.state">, </span>
    <span class="state">{{ $ctrl.address.state }}</span><span ng-show="$ctrl.address.state && $ctrl.address.postal_code"> </span>
    <span class="postal_code">{{ $ctrl.address.postal_code }}</span>
    <span ng-if="($ctrl.address.city.length + $ctrl.address.state.length + $ctrl.address.postal_code.length) == 0"">&nbsp;</span>`
};
