'use strict';

import Terminal from '../../models/terminal';

class MerchantTerminalNew {
  constructor(CurrentMerchant, MerchantLocations, Terminals, $state, Messages, FormErrors) {
    "ngInject";

    this.CurrentMerchant = CurrentMerchant;
    this.MerchantLocations = MerchantLocations;
    this.Terminals = Terminals;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.merchant = {};
    this.merchantLocation = {};
  }

  $onInit() {
    this.terminal = new Terminal();
    this.merchant = this.CurrentMerchant.instance();

    this.MerchantLocations.getMerchantLocation(this.$state.params.locationId).then((merchantLocation) => {
      this.merchantLocation = merchantLocation;
    });
  }

  createTerminal() {
    this.Terminals.createTerminal(this.$state.params.locationId, this.terminal).then(() => {
      this.Messages.addSuccess('Merchant Terminal created.');
      this.$state.go('merchant.location.view');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  };
}

export default {
  controller: MerchantTerminalNew,
  templateUrl: 'es6/components/merchant-terminal-new/merchant-terminal-new.html'
};
