export default class PhoneNumbers {
  constructor(attrs) {
    attrs = attrs || {};

    this.primary = attrs.primary || '';
    this.fax = attrs.fax || '';
  }
}
