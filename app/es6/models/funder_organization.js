'use strict';

export default class FunderOrganization {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.name = attrs.name || '';
    // Will eventually have a FunderOffice and will set something like:
    //   this.headquarter_office = new FunderOffice(attrs.headquarter_office || {});
    // NOTE: HQ Office will be used to source an address, phone numbers and primary contact to be used by Funder Org
    if (attrs.hasOwnProperty('service_fee')) {
      this.service_fee = attrs.service_fee;
    } else {
      this.service_fee = '5.0';
    }
  }
}
