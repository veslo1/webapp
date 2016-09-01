'use strict';

import CardLoad from '../../models/card_load';

class CardLoadView {
  constructor($state, CardLoads, Messages) {
    "ngInject";

    this.$state = $state;
    this.CardLoads = CardLoads;
    this.Messages = Messages;

    this.cardLoad = {};
    this.permissions = {};

    this.CardLoads.getCardLoad(this.$state.params.id).then((response) => {
      this.cardLoad = new CardLoad(response.data.card_load);
      this.permissions = response.data.permissions;
    });
  }

  canApprove() {
    return this.permissions.can_approve === true;
  }

  canAcknowledge() {
    return this.permissions.can_acknowledge === true;
  }

  approveFund() {
    this.CardLoads.approveFund(this.cardLoad.id).then(() => {
      this.Messages.addSuccess('Card load approved.');
      this.$state.go('project.overview.index', { id: this.cardLoad.project_id });
    });
  };

  acknowledgeFund() {
    this.CardLoads.acknowledgeFund(this.cardLoad.id).then(() => {
      this.Messages.addSuccess('Card load acknowledged.');
      this.$state.go('project.overview.index', { id: this.cardLoad.project_id });
    });
  };
}

export default {
  controller: CardLoadView,
  templateUrl: 'es6/components/card-load-view/card-load-view.html'
};
