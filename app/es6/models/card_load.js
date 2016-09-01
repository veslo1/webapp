'use strict';

import PropertyModel from './property_model';

export default class CardLoad extends PropertyModel {
  constructor(data) {
    super(data);
  }

  approvedText() {
    if (this.approved === true) {
      return 'Yes';
    } else {
      return '' + this.approvals.length + ' of ' + this.total_approvals_required + ' approvals';
    }
  }

  acknowledgedText() {
    if (this.acknowledged === true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }

  statusText() {
    if (this.approved === true) {
      if (this.acknowledged === true) {
        return 'Acknowledged';
      } else {
        return 'Not Acknowledged';
      }
    } else {
      return `${this.approvals.length} of ${this.total_approvals_required} Approvals Required`;
    }
  }
}
