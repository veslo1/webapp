'use strict';

class BankAccountDocumentUpload {
  constructor(Upload, FormErrors) {
    "ngInject";

    this.Upload = Upload;
    this.FormErrors = FormErrors;

    this.upload = {
      file: undefined,
      errorFile: undefined
    };
  }

  $onInit() {
    this.formSubmitted = false;
  }

  save() {
    if (this.form.file.$valid && this.upload.file) {
      this.uploadFile();
    }
  }

  uploadFile() {
    this.formSubmitted = true;

    this.Upload.upload({ url: this.uploadUrl, data: { data: { file: this.upload.file } } }).then((response) => {
      this.uploadSuccess();
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
      this.formSubmitted = false;
    }, (evt) => {
      this.upload.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
    });
  }

  uploadButtonDisabled() {
    return !this.upload.file || (this.form && this.form.$invalid) || this.formSubmitted;
  }
}

export default {
  bindings: {
    uploadSuccess: '&',
    uploadUrl: '@'
  },
  controller: BankAccountDocumentUpload,
  templateUrl: 'es6/components/bank-account-document-upload/bank-account-document-upload.html'
};
