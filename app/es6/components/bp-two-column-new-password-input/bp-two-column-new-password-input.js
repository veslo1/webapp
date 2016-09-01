'use strict';

class BpTwoColumnNewPasswordInput {
  constructor() {
  }

  $onInit() {
    this.passwordConfirmationValue = '';
    this.passwordConfirmationName = `${this.name}_confirmation`;
  }
}

export default {
  require: {
    form: '^form'
  },
  bindings: {
    model: '=',
    label: '@',
    name: '@'
  },
  controller: BpTwoColumnNewPasswordInput,
  templateUrl: 'es6/components/bp-two-column-new-password-input/bp-two-column-new-password-input.html'
};
