'use strict';

export default class AchAccount {
  constructor(data) {
    data = data || {};

    this.id = data.id || '';
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';
    this.full_name = data.full_name || '';
    this.email = data.email || '';
    this.status = data.status || '';
  }

  isStored() {
    return this.id !== '';
  }

  needsDocumentUpload() {
    return this.status === 'customer_verification_document_needed' || this.status === 'customer_verification_document_failed';
  }
}
