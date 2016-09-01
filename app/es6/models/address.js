export default class Address {
  constructor(attrs) {
    attrs = attrs || {};

    this.street1 = attrs.street1 || '';
    this.street2 = attrs.street2 || '';
    this.city = attrs.city || '';
    this.state = attrs.state || '';
    this.postal_code = attrs.postal_code || '';
  }
}
