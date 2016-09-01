'use strict';

import PropertyModel from './property_model';

class CommittedFund extends PropertyModel {
  constructor(data) {
    super(data);

    this.permissions = {};
  }

  canAcknowledge() {
    return this.permissions.can_acknowledge === true;
  }

  acknowledgedText() {
    if (this.acknowledged === true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  statusText() {
    if (this.acknowledged === true) {
      return 'Acknowledged';
    } else {
      return 'Pending';
    }
  }

  fundTypeText() {
    if (this.fund_type === 'material_funds') {
      return 'Material Funds';
    } else if (this.fund_type === 'lop_funds') {
      return 'LOP Funds';
    } else {
      return this.fund_type;
    }
  }
}

export default CommittedFund;
