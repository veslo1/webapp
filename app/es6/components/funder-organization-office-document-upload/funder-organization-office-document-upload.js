'use strict';

class FunderOrganizationOfficeDocumentUpload {
  constructor(FunderOrganizationOffices, Messages, $state) {
    "ngInject";

    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.Messages = Messages;
    this.$state = $state;
  }

  uploadUrl() {
    return this.FunderOrganizationOffices.createDocumentUrl(this.funderOffice.id);
  }

  uploadSuccess() {
    this.$state.go('funderOrg.offices.office.overview');
    this.Messages.addSuccess("Document uploaded.");
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  controller: FunderOrganizationOfficeDocumentUpload,
  template: `
   <bp-breadcrumbs>
     <bp-breadcrumb link="funderOrg.offices.index">Offices</bp-breadcrumb>
     <bp-breadcrumb link="funderOrg.offices.office.overview">{{ $ctrl.funderOffice.name }}</bp-breadcrumb>
     <bp-breadcrumb>Responsible Individual Document Upload</bp-breadcrumb>
   </bp-breadcrumbs>

   <bank-account-document-upload upload-url="{{$ctrl.uploadUrl()}}" upload-success="$ctrl.uploadSuccess()"></bank-account-document-upload>
  `
};
