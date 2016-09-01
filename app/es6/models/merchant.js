'use strict';

import Address from './address';
import User from './user';
import PhoneNumbers from './phone_numbers';

export default class Merchant {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.merchant_id = attrs.merchant_id || '';
    this.name = attrs.name || '';
    this.address = new Address(attrs.address || {});
    this.phone_numbers = new PhoneNumbers(attrs.phone_numbers || {});
    this.primary_contact_user_id = attrs.primary_contact_user_id || '';
    this.primary_contact_user = new User(attrs.primary_contact_user || {});
  }
}
