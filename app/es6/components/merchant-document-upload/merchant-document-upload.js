'use strict';

class MerchantDocumentUpload {
  constructor(CurrentMerchant, Messages, Merchants, $state) {
    "ngInject";

    this.merchant = CurrentMerchant.instance();
    this.Merchants = Merchants;
    this.Messages = Messages;
    this.$state = $state;
  }

  uploadUrl() {
    return this.Merchants.createDocumentUrl(this.merchant.id);
  }

  uploadSuccess() {
    this.$state.go('merchant.view');
    this.Messages.addSuccess("Document uploaded.");
  }
}

export default {
  controller: MerchantDocumentUpload,
  template: `
    <bank-account-document-upload upload-url="{{$ctrl.uploadUrl()}}" upload-success="$ctrl.uploadSuccess()"></bank-account-document-upload>
  `
};
