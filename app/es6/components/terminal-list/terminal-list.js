'use strict';

class TerminalsCtrl {
  constructor(Terminals) {
    "ngInject";

    this.terminals = [];
    this.Terminals = Terminals;
  }

  $onInit() {
    this.Terminals.query(this.merchantLocationId).then((terminals) => {
      this.terminals = terminals;
    });
  }
}

export default {
  controller: TerminalsCtrl,
  bindings: {
    showAddTerminalButton: '=',
    merchantLocationId: '='
  },
  templateUrl: 'es6/components/terminal-list/terminal-list.html'
};
